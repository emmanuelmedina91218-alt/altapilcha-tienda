import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const NosotrosPage = () => {
  const values = [
    {
      icon: Award,
      title: 'Calidad',
      description: 'Seleccionamos cuidadosamente cada producto para garantizar la mejor calidad en indumentaria deportiva y urbana.'
    },
    {
      icon: Users,
      title: 'Estilo',
      description: 'Creemos que la ropa es una forma de expresión. Ofrecemos prendas que reflejan tu personalidad y estilo único.'
    },
    {
      icon: Heart,
      title: 'Comunidad',
      description: 'Más que una tienda, somos una comunidad de personas apasionadas por la moda urbana y el deporte.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Sobre Nosotros - Alta Pilcha</title>
        <meta name="description" content="Conocé la historia de Alta Pilcha. Somos una tienda argentina de indumentaria deportiva y urbana con pasión por el estilo y la calidad." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden pt-16">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920"
              alt="Urban fashion background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center px-4"
          >
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-wider mb-4">
              <span className="text-primary">Sobre</span>
              <span className="text-white"> Nosotros</span>
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </motion.div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1"
              >
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
                  alt="Local de Alta Pilcha"
                  className="w-full aspect-square object-cover rounded-2xl border-[3px] border-primary shadow-hard-red"
                />
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-1 lg:order-2 space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
                  Quiénes Somos
                </h2>
                <div className="w-16 h-1 bg-primary" />

                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Alta Pilcha nació de la pasión por el streetwear y la cultura urbana. Somos una tienda argentina dedicada a ofrecer indumentaria deportiva con estilo, donde cada prenda es una forma de expresión personal.
                  </p>
                  <p>
                    Creemos que la moda no es solo vestirse, es una manera de mostrar quién sos. Por eso, seleccionamos cuidadosamente cada producto para que encuentres prendas que realmente te representen.
                  </p>
                  <p>
                    Nuestro compromiso es simple: calidad, precio justo y atención personalizada. Queremos que cada cliente se sienta parte de nuestra comunidad, donde el estilo urbano y deportivo se encuentran.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Values Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-center mb-4">
                Nuestros Valores
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-12" />

              <div className="grid md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    className="bg-card rounded-lg p-8 text-center space-y-4 hover:shadow-hard-red-sm transition-all duration-300"
                  >
                    <div className="flex justify-center">
                      <div className="bg-primary/10 p-4 rounded-lg">
                        <value.icon className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold uppercase tracking-wider">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-secondary py-20 border-t-2 border-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider">
                Unite a la Comunidad Alta Pilcha
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Descubrí nuestra colección completa y encontrá las prendas que mejor te representen.
              </p>
              {/* FIX: usar Link de react-router-dom en lugar de <a href> para no recargar la página */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link to="/tienda">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-wider px-8 py-4 rounded-lg shadow-hard-red-sm transition-all duration-200"
                  >
                    Ver Tienda
                  </motion.button>
                </Link>
                <Link to="/contacto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white text-white hover:bg-white hover:text-black font-bold uppercase tracking-wider px-8 py-4 rounded-lg transition-all duration-200"
                  >
                    Contactanos
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default NosotrosPage;
