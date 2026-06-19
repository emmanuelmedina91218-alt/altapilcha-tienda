
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, Clock, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const ContactoPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    motivo: '',
    mensaje: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.motivo || !formData.mensaje) {
      toast.error('Por favor completá todos los campos requeridos');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Por favor ingresá un email válido');
      return;
    }

    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push({
      ...formData,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

    setSubmitted(true);
    toast.success('Mensaje enviado correctamente');

    setTimeout(() => {
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        motivo: '',
        mensaje: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hola! Quiero hacer una consulta sobre Alta Pilcha');
    window.open(`https://wa.me/5491123456789?text=${message}`, '_blank');
  };

  return (
    <>
      <Helmet>
        <title>Contacto - Alta Pilcha</title>
        <meta name="description" content="Contactate con Alta Pilcha. Estamos para ayudarte con tus consultas sobre productos, pedidos y más." />
      </Helmet>

      <div className="min-h-screen pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wider mb-4">
              Contactanos
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ¿Tenés alguna consulta? Escribinos, estamos para ayudarte.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-card rounded-lg p-6 space-y-6">
                <h2 className="text-2xl font-bold uppercase tracking-wider">Información de Contacto</h2>

                <div className="space-y-4">
                  <button
                    onClick={handleWhatsAppClick}
                    className="flex items-start space-x-4 w-full text-left hover:bg-secondary/50 p-4 rounded-lg transition-all duration-200"
                  >
                    <div className="bg-[#25D366]/10 p-3 rounded-lg flex-shrink-0">
                      <svg className="w-6 h-6 fill-[#25D366]" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">WhatsApp</h3>
                      <p className="text-sm text-muted-foreground">+54 9 11 2345-6789</p>
                    </div>
                  </button>

                  <a
                    href="mailto:info@altapilcha.com"
                    className="flex items-start space-x-4 hover:bg-secondary/50 p-4 rounded-lg transition-all duration-200"
                  >
                    <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Email</h3>
                      <p className="text-sm text-muted-foreground">info@altapilcha.com</p>
                    </div>
                  </a>

                  <div className="flex items-start space-x-4 p-4">
                    <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Horarios</h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Lunes-Viernes: 10:00-20:00hs</p>
                        <p>Sábados: 10:00-17:00hs</p>
                        <p>Domingos: Cerrado</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4">
                    <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Ubicación</h3>
                      <p className="text-sm text-muted-foreground">Buenos Aires, Argentina</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-card rounded-lg overflow-hidden shadow-hard-red-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52562.20647781411!2d-58.445!3d-34.603722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812e88e88e87!2sBuenos%20Aires%2C%20Argentina!5e0!3m2!1sen!2s!4v1234567890"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Alta Pilcha"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-secondary rounded-lg p-8">
                <h2 className="text-2xl font-bold uppercase tracking-wider mb-6">Envianos un Mensaje</h2>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-primary/10 border-2 border-primary rounded-lg p-8 text-center"
                  >
                    <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Mensaje Enviado</h3>
                    <p className="text-muted-foreground">Te responderemos a la brevedad</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-semibold mb-2 uppercase tracking-wider text-white">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full bg-background border-2 border-border rounded-lg px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all duration-200"
                        placeholder="Juan Pérez"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold mb-2 uppercase tracking-wider text-white">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-background border-2 border-border rounded-lg px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all duration-200"
                        placeholder="juan@ejemplo.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="telefono" className="block text-sm font-semibold mb-2 uppercase tracking-wider text-white">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full bg-background border-2 border-border rounded-lg px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all duration-200"
                        placeholder="+54 9 11 1234-5678"
                      />
                    </div>

                    <div>
                      <label htmlFor="motivo" className="block text-sm font-semibold mb-2 uppercase tracking-wider text-white">
                        Motivo *
                      </label>
                      <select
                        id="motivo"
                        name="motivo"
                        value={formData.motivo}
                        onChange={handleChange}
                        required
                        className="w-full bg-background border-2 border-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-all duration-200"
                      >
                        <option value="">Seleccioná un motivo</option>
                        <option value="consulta-producto">Consulta sobre producto</option>
                        <option value="pedido">Pedido</option>
                        <option value="cambio-devolucion">Cambio o Devolución</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="mensaje" className="block text-sm font-semibold mb-2 uppercase tracking-wider text-white">
                        Mensaje *
                      </label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full bg-background border-2 border-border rounded-lg px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all duration-200 resize-none"
                        placeholder="Escribí tu mensaje aquí..."
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider py-6 text-base"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Enviar Mensaje
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactoPage;
