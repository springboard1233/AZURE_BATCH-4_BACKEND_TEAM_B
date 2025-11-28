import { motion } from 'framer-motion';
import { Shield, Lock, Key, CheckCircle, FileCheck, Users, Server, Eye } from 'lucide-react';

const certifications = [
  {
    name: 'SOC 2 Type II',
    icon: '🏆',
    description: 'Annual audits for security, availability, and confidentiality',
    status: 'Certified',
    color: 'from-[#4CAF50]/10 to-[#4CAF50]/5',
  },
  {
    name: 'ISO 27001',
    icon: '🔐',
    description: 'International information security management standard',
    status: 'Certified',
    color: 'from-[#2EBFFF]/10 to-[#2EBFFF]/5',
  },
  {
    name: 'GDPR Compliant',
    icon: '🇪🇺',
    description: 'Full compliance with EU data protection regulations',
    status: 'Compliant',
    color: 'from-[#AE71FF]/10 to-[#AE71FF]/5',
  },
  {
    name: 'HIPAA Ready',
    icon: '🏥',
    description: 'Healthcare data protection capabilities',
    status: 'Available',
    color: 'from-[#FF9800]/10 to-[#FF9800]/5',
  },
];

const securityFeatures = [
  {
    icon: <Lock className="w-8 h-8 text-[#2EBFFF]" />,
    title: 'End-to-End Encryption',
    description: 'TLS 1.3 in transit, AES-256 at rest',
    details: [
      'All data encrypted during transmission',
      'AES-256 encryption for stored data',
      'Customer-managed encryption keys (CMEK)',
      'Hardware security module (HSM) support',
    ],
  },
  {
    icon: <Key className="w-8 h-8 text-[#4CAF50]" />,
    title: 'Access Control',
    description: 'Enterprise-grade identity management',
    details: [
      'Role-based access control (RBAC)',
      'Single sign-on (SSO) integration',
      'Multi-factor authentication (MFA)',
      'IP whitelisting and geo-restrictions',
    ],
  },
  {
    icon: <Server className="w-8 h-8 text-[#AE71FF]" />,
    title: 'Infrastructure Security',
    description: 'Protected cloud infrastructure',
    details: [
      'Virtual network isolation',
      'DDoS protection',
      'Web application firewall (WAF)',
      'Regular security patches',
    ],
  },
  {
    icon: <Eye className="w-8 h-8 text-[#B2FF59]" />,
    title: 'Monitoring & Auditing',
    description: 'Complete visibility and logging',
    details: [
      'Real-time security monitoring',
      'Comprehensive audit logs',
      'Anomaly detection',
      'Automated alerting',
    ],
  },
];

const dataProtection = [
  {
    aspect: 'Data Residency',
    description: 'Choose where your data is stored',
    features: ['Regional data centers', 'Compliance with local laws', 'No cross-border transfers', 'Custom locations available'],
  },
  {
    aspect: 'Data Retention',
    description: 'Control how long data is kept',
    features: ['Configurable retention periods', 'Automatic data purging', 'Long-term archival options', 'Instant data deletion'],
  },
  {
    aspect: 'Data Backup',
    description: 'Reliable backup and recovery',
    features: ['Automated daily backups', 'Point-in-time recovery', 'Geo-redundant storage', '99.999999999% durability'],
  },
  {
    aspect: 'Data Privacy',
    description: 'Respect for user privacy',
    features: ['Minimal data collection', 'No third-party sharing', 'GDPR data rights support', 'Privacy by design'],
  },
];

const complianceTimeline = [
  { year: '2023', event: 'SOC 2 Type II Certification', icon: '🎯' },
  { year: '2023', event: 'ISO 27001 Certification', icon: '🏅' },
  { year: '2024', event: 'GDPR Compliance Validated', icon: '✅' },
  { year: '2024', event: 'HIPAA Ready Status', icon: '🏥' },
  { year: '2025', event: 'ISO 27017/27018 (in progress)', icon: '🚀' },
];

export default function SecurityPage() {
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
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#4CAF50] to-[#2d7a32] flex items-center justify-center glow-effect">
              <Shield className="w-10 h-10" />
            </div>
          </div>
          <h1 className="mb-4 neon-text">Security & Compliance</h1>
          <p className="text-[#9EA7B8] max-w-2xl mx-auto">
            Enterprise-grade security and compliance you can trust
          </p>
        </motion.div>

        {/* Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card-premium rounded-2xl p-8 mb-16 text-center"
        >
          <h2 className="mb-6">Our Security Commitment</h2>
          <p className="text-[#9EA7B8] max-w-3xl mx-auto mb-8">
            We take security seriously. Your data is protected with bank-level encryption, undergoes regular third-party audits, and is managed by a dedicated security team with decades of combined experience.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TrustMetric value="99.99%" label="Uptime SLA" />
            <TrustMetric value="256-bit" label="AES Encryption" />
            <TrustMetric value="24/7" label="Monitoring" />
            <TrustMetric value="SOC 2" label="Certified" />
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center">Certifications & Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <CertificationCard key={cert.name} cert={cert} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center">Security Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {securityFeatures.map((feature, index) => (
              <SecurityFeatureCard key={feature.title} feature={feature} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Data Protection */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center">Data Protection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataProtection.map((item, index) => (
              <DataProtectionCard key={item.aspect} item={item} delay={index * 0.1} />
            ))}
          </div>
        </motion.div>

        {/* Compliance Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-8 text-center">Compliance Journey</h2>
          <div className="glass-card rounded-xl p-8">
            <div className="space-y-4">
              {complianceTimeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 rounded-lg glass-card hover:bg-white/5 transition-colors"
                >
                  <div className="text-3xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="text-[#2EBFFF] mb-1">{item.year}</div>
                    <div>{item.event}</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-[#4CAF50]" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Penetration Testing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="glass-card-premium rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="mb-4">Regular Security Testing</h2>
                <p className="text-[#9EA7B8] mb-6">
                  We conduct regular penetration testing and vulnerability assessments with leading security firms to ensure our platform remains secure.
                </p>
                <ul className="space-y-3">
                  <SecurityCheckItem text="Quarterly penetration testing" />
                  <SecurityCheckItem text="Continuous vulnerability scanning" />
                  <SecurityCheckItem text="Annual third-party security audits" />
                  <SecurityCheckItem text="Bug bounty program" />
                  <SecurityCheckItem text="Incident response plan" />
                </ul>
              </div>
              <div className="glass-card p-8 rounded-xl text-center">
                <div className="text-6xl mb-4">🛡️</div>
                <div className="metric-value mb-2">Zero</div>
                <p className="text-[#9EA7B8]">Security breaches since inception</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Security Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl p-12 text-center"
        >
          <Users className="w-16 h-16 text-[#2EBFFF] mx-auto mb-6" />
          <h2 className="mb-4">Dedicated Security Team</h2>
          <p className="text-[#9EA7B8] mb-8 max-w-2xl mx-auto">
            Our security team is available 24/7 to respond to any concerns. Report security issues to security@aicloudforecast.com
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              <FileCheck className="w-5 h-5" />
              <span>View Security Docs</span>
            </button>
            <button className="btn-secondary">
              <span>Request Audit Reports</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function TrustMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="metric-value text-[#4CAF50] mb-1">{value}</div>
      <div className="text-[#9EA7B8]">{label}</div>
    </div>
  );
}

function CertificationCard({ cert, delay }: { cert: typeof certifications[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className={`glass-card rounded-xl p-6 text-center bg-gradient-to-br ${cert.color} hover-lift`}
    >
      <div className="text-5xl mb-4">{cert.icon}</div>
      <h3 className="mb-2">{cert.name}</h3>
      <p className="text-[#9EA7B8] mb-4">{cert.description}</p>
      <div className="px-3 py-1 rounded-full bg-[#4CAF50]/20 text-[#4CAF50] text-xs inline-block">
        {cert.status}
      </div>
    </motion.div>
  );
}

function SecurityFeatureCard({ feature, delay }: { feature: typeof securityFeatures[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass-card rounded-xl p-6 hover-lift"
    >
      <div className="mb-4">{feature.icon}</div>
      <h3 className="mb-2">{feature.title}</h3>
      <p className="text-[#9EA7B8] mb-4">{feature.description}</p>
      <ul className="space-y-2">
        {feature.details.map((detail, idx) => (
          <li key={idx} className="flex items-start gap-2 text-[#9EA7B8]">
            <CheckCircle className="w-4 h-4 text-[#4CAF50] flex-shrink-0 mt-1" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function DataProtectionCard({ item, delay }: { item: typeof dataProtection[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass-card rounded-xl p-6 hover-lift"
    >
      <h3 className="mb-2">{item.aspect}</h3>
      <p className="text-[#9EA7B8] mb-4">{item.description}</p>
      <ul className="space-y-2">
        {item.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-[#9EA7B8]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#2EBFFF]"></div>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function SecurityCheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-[#4CAF50]/20 flex items-center justify-center flex-shrink-0">
        <CheckCircle className="w-4 h-4 text-[#4CAF50]" />
      </div>
      <span>{text}</span>
    </li>
  );
}
