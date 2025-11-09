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
                <span>Zwevend chatpictogram rechtsonder</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Vloeiende slide-in animatie</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Responsive design (380px desktop, volledig mobiel)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Typindicator animatie</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Premium, elegante vormgeving</span>
              </li>
            </ul>
          </div>

          <div className="bg-primary/5 rounded-2xl p-8 border border-accent/20">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              WordPress Integratie
            </h2>
            <p className="text-muted-foreground mb-4">
              Binnenkort beschikbaar: embed deze widget in WordPress met een simpel script tag.
            </p>
            <div className="bg-muted rounded-lg p-4 text-left font-mono text-sm overflow-x-auto">
              <code className="text-foreground">
                {`<script src="chatbot-widget.js"></script>\n<div id="vloerbot-root"></div>`}
              </code>
            </div>
          </div>
        </div>
      </div>

      <ChatWidget />
    </div>
  );
};

export default Index;
