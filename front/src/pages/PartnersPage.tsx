import { motion } from 'framer-motion';
import { Handshake, Users, Award, Briefcase, TrendingUp, Globe } from 'lucide-react';

const partnerTiers = [
  {
    tier: 'Technology Partners',
    icon: '🔧',
    description: 'Leading technology companies we integrate with',
    partners: [
      { name: 'Microsoft Azure', logo: '☁️', status: 'Strategic Partner' },
      { name: 'Amazon Web Services', logo: '🔶', status: 'Strategic Partner' },
      { name: 'Google Cloud', logo: '🌐', status: 'Strategic Partner' },
      { name: 'Kubernetes', logo: '⚓', status: 'Technology Partner' },
      { name: 'Datadog', logo: '🐶', status: 'Technology Partner' },
      { name: 'New Relic', logo: '📊', status: 'Technology Partner' },
    ],
  },
  {
    tier: 'Consulting Partners',
    icon: '💼',
    description: 'Expert consultancies delivering implementation services',
    partners: [
      { name: 'Accenture', logo: '🏢', status: 'Global Partner' },
      { name: 'Deloitte', logo: '🌟', status: 'Global Partner' },
      { name: 'PwC', logo: '⭐', status: 'Global Partner' },
      { name: 'KPMG', logo: '🔷', status: 'Regional Partner' },
    ],
  },
  {
    tier: 'Solution Partners',
    icon: '🚀',
    description: 'Companies building solutions on our platform',
    partners: [
      { name: 'CloudOps Pro', logo: '☁️', status: 'Gold Partner' },
      { name: 'DevScale Solutions', logo: '⚡', status: 'Gold Partner' },
      { name: 'AI Infrastructure Co', logo: '🤖', status: 'Silver Partner' },
      { name: 'CloudCost Optimizer', logo: '💰', status: 'Silver Partner' },
    ],
  },
];

const partnerBenefits = [
  {
    icon: <TrendingUp className="w-8 h-8 text-[#4CAF50]" />,
    title: 'Revenue Growth',
    description: 'Access to our customer base and co-selling opportunities',
    benefits: ['Lead sharing', 'Co-marketing', 'Revenue share', 'Sales enablement'],
  },
  {
    icon: <Award className="w-8 h-8 text-[#2EBFFF]" />,
    title: 'Technical Support',
    description: 'Dedicated partner engineering and technical resources',
    benefits: ['API access', 'Beta features', 'Technical docs', 'Partner portal'],
  },
  {
    icon: <Users className="w-8 h-8 text-[#AE71FF]" />,
    title: 'Training & Certification',
    description: 'Comprehensive training programs for your team',
    benefits: ['Online courses', 'Certifications', 'Workshops', 'Webinars'],
  },
  {
    icon: <Globe className="w-8 h-8 text-[#B2FF59]" />,
    title: 'Global Reach',
    description: 'Expand your business with our international presence',
    benefits: ['Regional support', 'Localization', 'Events', 'Networking'],
  },
];

const partnerProgram = [
  {
    level: 'Silver Partner',
    requirements: ['$50K ARR', '5 customers', 'Technical certification'],
    benefits: ['20% discount', 'Partner portal', 'Marketing materials', 'Quarterly reviews'],
    color: 'from-[#C0C0C0]/10 to-[#C0C0C0]/5',
  },
  {
    level: 'Gold Partner',
    requirements: ['$250K ARR', '20 customers', 'Advanced certification'],
    benefits: ['30% discount', 'Co-marketing funds', 'Priority support', 'Dedicated CSM'],
    color: 'from-[#FFD700]/10 to-[#FFD700]/5',
  },
  {
    level: 'Platinum Partner',
    requirements: ['$1M ARR', '50 customers', 'Strategic alignment'],
    benefits: ['40% discount', 'Joint GTM', 'Executive sponsor', 'Custom SLAs'],
    color: 'from-[#E5E4E2]/10 to-[#E5E4E2]/5',
  },
];

const successStories = [
  {
    partner: 'CloudOps Pro',
    logo: '☁️',
    story: 'Grew from 5 to 50 customers in 12 months using our platform',
    results: ['300% revenue growth', '50+ implementations', '98% customer satisfaction'],
  },
  {
    partner: 'Accenture',
    logo: '🏢',
    story: 'Delivered $10M in customer value through optimization projects',
    results: ['100+ enterprises served', '$10M savings generated', 'Global deployment'],
  },
  {
    partner: 'DevScale Solutions',
    logo: '⚡',
    story: 'Built specialized vertical solutions for healthcare and finance',
    results: ['2 industry solutions', '25 customers', 'HIPAA certified'],
  },
];

export default function PartnersPage() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#2EBFFF] to-[#AE71FF] flex items-center justify-center glow-effect">
              <Handshake className="w-10 h-10" />
            </div>
          </div>
          <h1 className="mb-4 neon-text">Partner Ecosystem</h1>
          <p className="text-[#9EA7B8] max-w-2xl mx-auto">
            Join our growing network of technology, consulting, and solution partners
          </p>
        </motion.div>

        {/* Partner Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          <StatCard value="150+" label="Total Partners" />
          <StatCard value="$50M+" label="Partner Revenue" />
          <StatCard value="1,000+" label="Joint Customers" />
          <StatCard value="45" label="Countries" />
        </motion.div>

        {/* Partner Categories */}
        <div className="space-y-12 mb-16">
          {partnerTiers.map((tier, index) => (
            <PartnerTierSection key={tier.tier} tier={tier} delay={index * 0.1} />
          ))}
        </div>

        {/* Partner Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center">Partner Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerBenefits.map((benefit, index) => (
              <BenefitCard key={benefit.title} benefit={benefit} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Partner Program Levels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center">Partner Program Levels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnerProgram.map((level, index) => (
              <ProgramLevelCard key={level.level} level={level} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center">Partner Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <SuccessStoryCard key={story.partner} story={story} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Become a Partner CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card-premium rounded-2xl p-12 text-center"
        >
          <Briefcase className="w-16 h-16 text-[#2EBFFF] mx-auto mb-6" />
          <h2 className="mb-4">Become a Partner</h2>
          <p className="text-[#9EA7B8] mb-8 max-w-2xl mx-auto">
            Join our partner ecosystem and grow your business with industry-leading cloud forecasting technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              <Handshake className="w-5 h-5" />
              <span>Apply Now</span>
            </button>
            <button className="btn-secondary">
              <span>Download Partner Guide</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card-premium p-6 rounded-xl text-center"
    >
      <div className="metric-value text-[#2EBFFF] mb-2">{value}</div>
      <div className="text-[#9EA7B8]">{label}</div>
    </motion.div>
  );
}

function PartnerTierSection({ tier, delay }: { tier: typeof partnerTiers[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{tier.icon}</span>
        <div>
          <h2>{tier.tier}</h2>
          <p className="text-[#9EA7B8]">{tier.description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tier.partners.map((partner, index) => (
          <motion.div
            key={partner.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: delay + index * 0.05 }}
            whileHover={{ y: -5 }}
            className="glass-card p-6 rounded-xl hover-lift flex items-center gap-4"
          >
            <div className="text-4xl">{partner.logo}</div>
            <div className="flex-1">
              <h3 className="mb-1">{partner.name}</h3>
              <div className="text-xs text-[#2EBFFF]">{partner.status}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function BenefitCard({ benefit, delay }: { benefit: typeof partnerBenefits[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass-card rounded-xl p-6 hover-lift"
    >
      <div className="mb-4">{benefit.icon}</div>
      <h3 className="mb-2">{benefit.title}</h3>
      <p className="text-[#9EA7B8] mb-4">{benefit.description}</p>
      <ul className="space-y-2">
        {benefit.benefits.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2 text-[#9EA7B8]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2EBFFF]"></div>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function ProgramLevelCard({ level, delay }: { level: typeof partnerProgram[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`glass-card rounded-xl p-6 bg-gradient-to-br ${level.color} hover-lift`}
    >
      <h3 className="mb-6 text-center">{level.level}</h3>
      
      <div className="mb-6">
        <div className="text-[#9EA7B8] mb-3">Requirements:</div>
        <ul className="space-y-2">
          {level.requirements.map((req, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2EBFFF]"></div>
              <span>{req}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="text-[#9EA7B8] mb-3">Benefits:</div>
        <ul className="space-y-2">
          {level.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4CAF50]"></div>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function SuccessStoryCard({ story, delay }: { story: typeof successStories[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass-card rounded-xl p-6 hover-lift"
    >
      <div className="text-5xl mb-4">{story.logo}</div>
      <h3 className="mb-3">{story.partner}</h3>
      <p className="text-[#9EA7B8] mb-4">{story.story}</p>
      <div className="space-y-2">
        {story.results.map((result, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#4CAF50]" />
            <span className="text-sm">{result}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
