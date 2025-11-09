import ChatWidget from "@/components/chatbot/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            VloerBot - AI Assistent
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Een premium chatbot widget voor je WordPress-website. Klik op het chatpictogram rechtsonder om te beginnen.
          </p>
          
          <div className="bg-card rounded-2xl shadow-lg p-8 mb-12 border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Functies
            </h2>
            <ul className="text-left space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span><strong>Echte AI-conversaties:</strong> Google Gemini 2.5 Flash voor intelligente antwoorden</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span><strong>Bestandsupload:</strong> Upload afbeeldingen en documenten voor specifiek advies</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span><strong>Streaming responses:</strong> Zie antwoorden in real-time verschijnen</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span><strong>Visuele analyse:</strong> AI kan vloerfoto's analyseren</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span><strong>Premium vormgeving:</strong> Elegant en responsive design</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span><strong>Beveiligde backend:</strong> Lovable Cloud voor opslag en AI</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary/5 rounded-2xl p-8 border border-accent/20">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Technologie
            </h2>
            <p className="text-muted-foreground mb-4">
              Deze chatbot gebruikt cutting-edge technologie:
            </p>
            <ul className="text-left space-y-2 text-muted-foreground">
              <li>• <strong>Lovable Cloud</strong> - Backend infrastructure</li>
              <li>• <strong>Google Gemini 2.5 Flash</strong> - AI model</li>
              <li>• <strong>Streaming responses</strong> - Real-time antwoorden</li>
              <li>• <strong>Image analysis</strong> - Visuele intelligentie</li>
              <li>• <strong>File storage</strong> - Beveiligde uploads</li>
            </ul>
          </div>
        </div>
      </div>

      <ChatWidget />
    </div>
  );
};

export default Index;
