'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const WHATSAPP_NUMBER = '54996156846';
const WHATSAPP_BASE_URL = 'https://api.whatsapp.com/send/';
const INSTAGRAM_URL = 'https://www.instagram.com/trennar.fisioterapia/';
const FACEBOOK_URL =
  'https://facebook.com/1047824268658975?ref=NONE_xav_ig_profile_page_web';
const BRAND_LOGO = '/images/brand/trennar-logo.jpg';

const EASING = [0.22, 1, 0.36, 1] as const;

const INSTAGRAM_BIO_ITEMS = [
  'Reabilitação de Joelho',
  'Fisioterapia Ortopédica',
  'Reabilitação Funcional',
  'Pilates',
];

type Professional = {
  name: string;
  role: string;
  specialty: string;
  photo: string;
};

type GallerySection = {
  title: string;
  description: string;
  images: string[];
};

const professionals: Professional[] = [
  {
    name: 'Carlos',
    role: 'Fisioterapeuta',
    specialty: 'Reabilitação funcional e recuperação de movimento.',
    photo: '/images/profissionais/carlos.jpg',
  },
  {
    name: 'Gustavo',
    role: 'Fisioterapeuta',
    specialty: 'Reabilitação com foco em desempenho e retorno seguro.',
    photo: '/images/profissionais/gustavo.jpg',
  },
  {
    name: 'Junior',
    role: 'Fisioterapeuta',
    specialty: 'Reabilitação orientada por evolução técnica.',
    photo: '/images/profissionais/junior.jpg',
  },
  {
    name: 'Luana',
    role: 'Fisioterapeuta',
    specialty: 'Fisioterapia com foco em Pilates clínico.',
    photo: '/images/profissionais/luana.jpg',
  },
];

const gallerySections: GallerySection[] = [
  {
    title: 'Fisioterapia',
    description:
      'Área de atendimento para avaliação e tratamento individualizado.',
    images: [
      '/images/galeria/fisioterapia-01.jpg',
      '/images/galeria/fisioterapia-02.jpg',
      '/images/galeria/fisioterapia-03.jpg',
    ],
  },
  {
    title: 'Pilates',
    description:
      'Ambiente dedicado ao pilates clínico, mobilidade e fortalecimento.',
    images: [
      '/images/galeria/pilates-01.jpg',
      '/images/galeria/pilates-02.jpg',
      '/images/galeria/pilates-03.jpg',
    ],
  },
  {
    title: 'Atendimento',
    description:
      'Recepção e estrutura pensadas para um cuidado próximo e humano.',
    images: [
      '/images/galeria/atendimento-01.jpg',
      '/images/galeria/atendimento-02.jpg',
      '/images/galeria/atendimento-03.jpg',
    ],
  },
];

const getContactLink = (professionalName: string) => {
  const message = `Olá, quero fazer um atendimento com ${professionalName}.`;
  const query = new URLSearchParams({
    phone: WHATSAPP_NUMBER,
    text: message,
    type: 'phone_number',
    app_absent: '0',
    utm_source: 'ig',
  });

  return `${WHATSAPP_BASE_URL}?${query.toString()}`;
};

const loadReveal = (delay: number, distance = 28) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.74, ease: EASING, delay },
});

const scrollReveal = (delay: number, distance = 24) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: EASING, delay },
});

export default function Home() {
  return (
    <main>
      <header className='hero'>
        <motion.div
          className='hero-glow hero-glow-left'
          animate={{ opacity: [0.3, 0.55, 0.3], y: [0, -16, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className='hero-glow hero-glow-right'
          animate={{ opacity: [0.25, 0.5, 0.25], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className='hero-grid'>
          <section className='hero-copy'>
            <motion.p className='section-label' {...loadReveal(0.08)}>
              Clínica Especializada
            </motion.p>

            <motion.h1 {...loadReveal(0.16)}>
              Reabilitação inteligente para você voltar ao seu melhor movimento.
            </motion.h1>

            <motion.p className='hero-text' {...loadReveal(0.24)}>
              Fisioterapia e pilates clínico com atendimento individualizado para
              dor, mobilidade, performance e qualidade de vida.
            </motion.p>

            <motion.ul className='hero-bio-list' {...loadReveal(0.3, 18)}>
              {INSTAGRAM_BIO_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </motion.ul>

            <motion.div className='hero-actions' {...loadReveal(0.32)}>
              <a
                href={getContactLink('um profissional da equipe Trennar')}
                target='_blank'
                rel='noreferrer'
              >
                Agendar no WhatsApp
              </a>
              <a href='#equipe'>Conhecer equipe</a>
            </motion.div>
          </section>

          <aside className='brand-panel'>
            <motion.figure className='brand-logo-frame' {...loadReveal(0.22)}>
              <Image
                src={BRAND_LOGO}
                alt='Logo da Trennar Clínica de Fisioterapia'
                width={800}
                height={800}
                className='brand-logo'
                priority
              />
            </motion.figure>
            <motion.p className='brand-name' {...loadReveal(0.28, 16)}>
              TRENNAR
            </motion.p>
            <motion.p className='brand-subtitle' {...loadReveal(0.34, 16)}>
              CLÍNICA DE FISIOTERAPIA
            </motion.p>
          </aside>
        </div>
      </header>

      <section className='services section-shell' id='servicos'>
        <motion.div className='section-head' {...scrollReveal(0.06)}>
          <p className='section-label'>Especialidades</p>
          <h2>Atendimento orientado pelas especialidades da clínica</h2>
        </motion.div>

        <div className='services-grid'>
          <motion.article className='service-card' {...scrollReveal(0.12)}>
            <h3>Reabilitação de Joelho</h3>
            <p>
              Estratégias terapêuticas para estabilidade, força e retorno seguro às
              atividades.
            </p>
          </motion.article>

          <motion.article className='service-card' {...scrollReveal(0.18)}>
            <h3>Fisioterapia Ortopédica</h3>
            <p>
              Tratamento de lesões e disfunções musculoesqueléticas com plano
              individualizado.
            </p>
          </motion.article>

          <motion.article className='service-card' {...scrollReveal(0.24)}>
            <h3>Reabilitação Funcional</h3>
            <p>
              Recuperação orientada para movimento, autonomia e desempenho no dia a
              dia.
            </p>
          </motion.article>

          <motion.article className='service-card' {...scrollReveal(0.3)}>
            <h3>Pilates</h3>
            <p>
              Sessões para postura, controle corporal e fortalecimento com foco em
              prevenção e evolução.
            </p>
          </motion.article>
        </div>
      </section>

      <section className='team section-shell' id='equipe'>
        <motion.div className='section-head' {...scrollReveal(0.06)}>
          <p className='section-label'>Equipe</p>
          <h2>Clique na foto e fale direto com o profissional</h2>
        </motion.div>

        <div className='team-grid'>
          {professionals.map((professional, index) => (
            <motion.article
              key={professional.name}
              className='team-card'
              {...scrollReveal(0.1 + index * 0.06)}
            >
              <a
                href={getContactLink(professional.name)}
                target='_blank'
                rel='noreferrer'
                className='team-photo-link'
                aria-label={`Falar com ${professional.name} no WhatsApp`}
              >
                <Image
                  src={professional.photo}
                  alt={`Foto de ${professional.name}`}
                  className='team-photo'
                  width={1200}
                  height={1600}
                />
              </a>

              <div className='team-copy'>
                <h3>{professional.name}</h3>
                <p>{professional.role}</p>
                <span>{professional.specialty}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {gallerySections.map((gallerySection, sectionIndex) => (
        <section className='gallery section-shell' key={gallerySection.title}>
          <motion.div className='section-head' {...scrollReveal(0.06)}>
            <p className='section-label'>Espaço {gallerySection.title}</p>
            <h2>{gallerySection.title}</h2>
            <p className='gallery-description'>{gallerySection.description}</p>
          </motion.div>

          <div className='gallery-grid'>
            {gallerySection.images.map((image, imageIndex) => (
              <motion.figure
                key={image}
                className='gallery-item'
                {...scrollReveal(0.1 + imageIndex * 0.06 + sectionIndex * 0.04)}
              >
                <Image
                  src={image}
                  alt={`Imagem da seção ${gallerySection.title}`}
                  width={1800}
                  height={1200}
                  className='gallery-photo'
                />
              </motion.figure>
            ))}
          </div>
        </section>
      ))}

      <section className='contact section-shell' id='contato'>
        <motion.div className='contact-panel' {...scrollReveal(0.1)}>
          <div>
            <p className='section-label'>Contato</p>
            <h2>Atendimento personalizado para cada fase da sua recuperação.</h2>
            <p>
              Entre em contato pelo WhatsApp ou acompanhe a clínica no Instagram e
              Facebook.
            </p>
          </div>

          <div className='contact-links'>
            <a
              href={getContactLink('um profissional da equipe Trennar')}
              target='_blank'
              rel='noreferrer'
            >
              WhatsApp
            </a>
            <a href={INSTAGRAM_URL} target='_blank' rel='noreferrer'>
              Instagram
            </a>
            <a href={FACEBOOK_URL} target='_blank' rel='noreferrer'>
              Facebook
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
