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
    const { plan } = await req.json()
    
    // Map plan names to secret names
    const planToSecretMap: Record<string, string> = {
      'basic': 'BASIC_PAYMENT_LINK',
      'premium': 'PREMIUM_PAYMENT_LINK',
      'family': 'FAMILY_PAYMENT_LINK',
      'success-pack': 'SUCCESS_PACK_PAYMENT_LINK'
    }

    const secretName = planToSecretMap[plan]
    if (!secretName) {
      throw new Error('Invalid plan selected')
    }

    // Get the payment link from secrets
    const paymentLink = Deno.env.get(secretName)
    if (!paymentLink) {
      throw new Error(`Payment link not configured for ${plan} plan`)
    }

    // Return the payment link
    return new Response(
      JSON.stringify({ url: paymentLink }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error processing payment link request:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})