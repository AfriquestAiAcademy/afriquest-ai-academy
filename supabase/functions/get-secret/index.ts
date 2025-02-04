import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { name } = await req.json()
    
    // List of allowed secret names for payment links
    const allowedSecrets = [
      'PREMIUM_PAYMENT_LINK',
      'FAMILY_PAYMENT_LINK',
      'EDUCATOR_PAYMENT_LINK',
      'CLASSROOM_PAYMENT_LINK',
      'SCHOOL_PAYMENT_LINK'
    ]

    // Validate the requested secret name
    if (!allowedSecrets.includes(name)) {
      console.error(`Invalid secret name requested: ${name}`)
      return new Response(
        JSON.stringify({ error: 'Invalid secret name' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Get the secret from environment variables
    const secret = Deno.env.get(name)
    
    if (!secret) {
      console.error(`Secret ${name} not found`)
      return new Response(
        JSON.stringify({ error: 'Secret not found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      )
    }

    // Return the secret
    return new Response(
      JSON.stringify({ secret }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('Error:', error.message)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})