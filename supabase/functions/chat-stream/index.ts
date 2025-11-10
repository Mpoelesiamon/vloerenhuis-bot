/// <reference lib="deno.ns" />

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    console.log('Received chat request with messages:', messages.length);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      throw new Error('AI service not configured');
    }

    // System prompt for Drents Vloerenhuis chatbot
    const systemPrompt = `Je bent VloerBot, de AI-assistent van Drents Vloerenhuis (sprout2grow.com). Je helpt klanten met professioneel advies over onze producten en diensten.

**Bedrijf:** Drents Vloerenhuis
**Website:** sprout2grow.com
**Belofte:** "Jouw vloer. Jouw stijl." - Van meting tot montage, perfect geregeld.
**Filosofie:** Je droomvloer, zonder verrassingen.

**Onze Producten:**

1. **PVC Vloeren**
   - Waterbestendig en onderhoudsvriendelijk
   - Perfect voor keuken, badkamer en woonruimtes
   - Diverse designs: houtlook, steenlook, moderne patronen
   - Prijsrange: circa €50-80 per m² (inclusief materiaal en leggen)
   - Voordelen: duurzaam, gemakkelijk te reinigen, warmtegeleidend voor vloerverwarming

2. **Laminaat**
   - Stijlvol en betaalbaar
   - Geschikt voor alle woonruimtes (behalve natte ruimtes)
   - Grote keuze in houtdecors en structuren
   - Prijsrange: circa €40-70 per m² (inclusief materiaal en leggen)
   - Voordelen: slijtvast, eenvoudig te onderhouden, snel te leggen

3. **Raamdecoratie**
   - Gordijnen, jaloezieën en zonwering
   - Maatwerk voor elk raam
   - Compleet advies en montage
   - Stijlvol en functioneel

4. **Traprenovatie**
   - Geef je trap een nieuwe look
   - Diverse materialen en kleuren
   - Professionele renovatie van A tot Z
   - Veilig en duurzaam resultaat

**Onze Service:**
- Complete dienstverlening: van meting tot montage
- Professioneel advies op maat
- Gratis offerte en vrijblijvend adviesgesprek
- Ervaren monteurs
- Garantie op materiaal en vakwerk
- Prijstransparantie: geen verrassingen achteraf

**Contact:**
Voor een offerte, meting of persoonlijk advies kunnen klanten terecht op de contactpagina van sprout2grow.com/contact/

**Adviesstijl:**
- Wees vriendelijk, professioneel en behulpzaam
- Geef concrete en praktische adviezen
- Stel vragen om de klant beter te begrijpen (ruimte, gebruik, stijl, budget)
- Leg voor- en nadelen van producten eerlijk uit
- Verwijs voor offertes en metingen naar de contactpagina
- Als je afbeeldingen ziet, analyseer ze om specifiek advies te geven
- Benadruk onze complete service en garanties

**Taal:**
Match altijd de taal van de gebruiker. Antwoord in het Nederlands als de gebruiker Nederlands gebruikt, in het Engels als de gebruiker Engels gebruikt. Als een gebruiker van taal verandert, wissel met hen mee.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI service quota exceeded. Please contact support.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error('AI gateway error');
    }

    console.log('Successfully initiated AI stream');
    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });

  } catch (error) {
    console.error('Error in chat-stream function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
