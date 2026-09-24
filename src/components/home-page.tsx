'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { GalleryCarousel } from '@/components/gallery-carousel';
import {
  TreatmentCarousel,
  type Treatment,
} from '@/components/treatment-carousel';
import type { GallerySection } from '@/lib/gallery-sections';

const WHATSAPP_NUMBER = '5554981090641';
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

const treatments: Treatment[] = [
  {
    id: 'pilates-individual',
    category: 'Pilates clínico',
    title: 'Aulas individuais',
    eyebrow: 'Acompanhamento 1:1',
    description:
      'Uma fisioterapeuta acompanha cada exercício de perto e adapta o treino aos seus objetivos.',
    features: [
      'Evolução segura e progressiva',
      'Exercícios totalmente adaptados',
      'Foco exclusivo no seu movimento',
    ],
    prices: [
      { label: '1x por semana', value: 'R$ 360/mês', detail: 'R$ 90 por aula' },
      { label: '2x por semana', value: 'R$ 640/mês', detail: 'R$ 80 por aula' },
    ],
    duration: '50 minutos por aula',
    whatsappLabel: 'Pilates individual',
  },
  {
    id: 'pilates-dupla',
    category: 'Pilates clínico',
    title: 'Aulas em dupla',
    eyebrow: 'Objetivos alinhados',
    description:
      'Treino compartilhado, acompanhado por uma fisioterapeuta em um ambiente profissional e motivador.',
    features: [
      'Dupla com objetivos compatíveis',
      'Evolução segura e progressiva',
      'Exercícios adaptados para cada pessoa',
    ],
    prices: [
      { label: '1x por semana', value: 'R$ 260/mês', detail: 'R$ 65 por aula' },
      { label: '2x por semana', value: 'R$ 480/mês', detail: 'R$ 60 por aula' },
    ],
    duration: '50 minutos por aula',
    whatsappLabel: 'Pilates em dupla',
  },
  {
    id: 'liberacao-miofascial',
    category: 'Terapia manual',
    title: 'Liberação miofascial',
    eyebrow: 'Menos tensão, mais movimento',
    description:
      'Atendimento especializado para aliviar desconfortos, recuperar mobilidade e melhorar o bem-estar.',
    features: [
      'Técnicas manuais avançadas',
      'Redução de dores e pontos de tensão',
      'Melhora da amplitude de movimento',
      'Pós-treino, prevenção, esporte e sobrecarga',
    ],
    prices: [{ label: 'Sessão individual', value: 'R$ 170' }],
    duration: 'Duração média de 50 minutos',
    note: 'Realizada por fisioterapeutas',
    whatsappLabel: 'Liberação miofascial',
  },
  {
    id: 'reabilitacao-padrao-ouro',
    category: 'Reabilitação',
    title: 'Padrão Ouro',
    eyebrow: '3 vezes por semana',
    description:
      'Maior frequência de estímulos e acompanhamento próximo para acelerar a progressão em cada fase.',
    features: [
      'Ajustes frequentes conforme a evolução',
      'Acompanhamento de força e mobilidade',
      'Mais consistência na recuperação',
    ],
    prices: [{ label: 'Plano intensivo', value: 'Consulte' }],
    duration: '3 atendimentos por semana',
    whatsappLabel: 'Plano de reabilitação Padrão Ouro',
  },
  {
    id: 'reabilitacao-padrao',
    category: 'Reabilitação',
    title: 'Plano Padrão',
    eyebrow: '2 vezes por semana',
    description:
      'Acompanhamento presencial contínuo com exercícios supervisionados e progressão planejada.',
    features: [
      'Progressão de mobilidade e força',
      'Evolução planejada em cada fase',
      'Segurança durante a reabilitação',
    ],
    prices: [{ label: 'Plano de acompanhamento', value: 'Consulte' }],
    duration: '2 atendimentos por semana',
    whatsappLabel: 'Plano de reabilitação Padrão',
  },
  {
    id: 'fisioterapia-individual',
    category: 'Fisioterapia',
    title: 'Atendimento individual',
    eyebrow: 'Plano feito para você',
    description:
      'Avaliação e exercícios planejados conforme seus objetivos, com foco total no movimento e nos resultados.',
    features: [
      'Atendimento individualizado',
      'Evolução segura e progressiva',
      'Acompanhamento profissional exclusivo',
    ],
    prices: [
      { label: '1x por semana', value: 'R$ 170', detail: 'por atendimento' },
      { label: '2x ou mais', value: 'R$ 145', detail: 'por atendimento' },
    ],
    duration: '50 minutos por atendimento',
    note: 'Seg–qui: 7h–12h e 13h–19h · sex: 7h–12h · sem convênios',
    whatsappLabel: 'Fisioterapia individual',
  },
].reverse();

type HomePageProps = {
  gallerySections: GallerySection[];
};

const getWhatsAppLink = (message: string) => {
  const query = new URLSearchParams({
    phone: WHATSAPP_NUMBER,
    text: message,
    type: 'phone_number',
    app_absent: '0',
    utm_source: 'ig',
  });

  return `${WHATSAPP_BASE_URL}?${query.toString()}`;
};

const getProfessionalContactLink = (professionalName: string) =>
  getWhatsAppLink(`Olá, quero fazer um atendimento com ${professionalName}.`);

const getServiceContactLink = (serviceName: string) =>
  getWhatsAppLink(
    `Olá! Quero saber mais e agendar o serviço de ${serviceName}.`,
  );

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

export function HomePage({ gallerySections }: HomePageProps) {
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
              Fisioterapia e pilates clínico com atendimento individualizado
              para dor, mobilidade, performance e qualidade de vida.
            </motion.p>

            <motion.ul className='hero-bio-list' {...loadReveal(0.3, 18)}>
              {INSTAGRAM_BIO_ITEMS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </motion.ul>

            <motion.div className='hero-actions' {...loadReveal(0.32)}>
              <a
                href={getProfessionalContactLink(
                  'um profissional da equipe Trennar',
                )}
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

        <motion.div {...scrollReveal(0.12)}>
          <TreatmentCarousel
            treatments={treatments}
            getContactLink={getServiceContactLink}
          />
        </motion.div>
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
                href={getProfessionalContactLink(professional.name)}
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
        <section className='gallery section-shell' key={gallerySection.id}>
          <motion.div className='section-head' {...scrollReveal(0.06)}>
            <p className='section-label'>Espaço {gallerySection.title}</p>
            <h2>{gallerySection.title}</h2>
            <p className='gallery-description'>{gallerySection.description}</p>
          </motion.div>

          <motion.div {...scrollReveal(0.12 + sectionIndex * 0.03)}>
            <GalleryCarousel
              images={gallerySection.images}
              title={gallerySection.title}
            />
          </motion.div>
        </section>
      ))}

      <section className='contact section-shell' id='contato'>
        <motion.div className='contact-panel' {...scrollReveal(0.1)}>
          <div>
            <p className='section-label'>Contato</p>
            <h2>
              Atendimento personalizado para cada fase da sua recuperação.
            </h2>
            <p>
              Entre em contato pelo WhatsApp ou acompanhe a clínica no Instagram
              e Facebook.
            </p>
          </div>

          <div className='contact-links'>
            <a
              href={getProfessionalContactLink(
                'um profissional da equipe Trennar',
              )}
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
