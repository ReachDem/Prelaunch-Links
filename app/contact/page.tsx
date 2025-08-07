import React from 'react'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-32">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact</h1>
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Nous contacter</h2>
            <p className="text-muted-foreground mb-8">
              N'hésitez pas à nous contacter pour discuter de vos projets.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">contact@votreentreprise.com</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Téléphone</h3>
              <p className="text-muted-foreground">+33 1 23 45 67 89</p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-muted rounded-lg">
            <h3 className="font-semibold mb-4">Formulaire de contact</h3>
            <p className="text-muted-foreground">
              Un formulaire de contact sera bientôt disponible ici.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
