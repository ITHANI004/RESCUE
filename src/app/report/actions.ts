'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function submitReport(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return redirect('/login')

    const details = formData.get('details') as string
    const type = formData.get('type') as string
    const severity = parseInt(formData.get('severity') as string) || 1
    const latitude = parseFloat(formData.get('latitude') as string) || 0
    const longitude = parseFloat(formData.get('longitude') as string) || 0
    const contact_number = formData.get('contact_number') as string
    const affected_count = parseInt(formData.get('affected_count') as string) || 0

    const { error } = await supabase
        .from('reports')
        .insert({
            details,
            type,
            severity,
            latitude,
            longitude,
            contact_number,
            affected_count,
            user_id: user.id,
            verified: false,
            created_at: new Date().toISOString()
        })

    if (error) {
        console.error(error)
        return redirect('/report?error=Failed to submit')
    }

    return redirect('/dashboard?message=Report received and is being processed')
}
