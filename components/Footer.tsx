'use client';

import { Github, Linkedin, Instagram, Facebook, Mail } from 'lucide-react';

// Custom X (Twitter) icon since lucide-react doesn't have it yet
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Custom TikTok icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/Alaa-din/mci-converter',
      filled: true,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/alaaeddine-elaichi-9064291a5/',
      filled: true,
    },
    {
      name: 'X',
      icon: XIcon,
      href: 'https://x.com/',
      filled: true,
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/',
      filled: true,
    },
    {
      name: 'TikTok',
      icon: TikTokIcon,
      href: 'https://tiktok.com/',
      filled: true,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com/',
      filled: true,
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:elaichialadin1@gmail.com',
      filled: true,
    },
  ];

  return (
    <footer className="mt-auto border-t border-white/10 bg-white/5 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-white/70 text-sm">
              &copy; {currentYear} Calculateur MCI. All Rights Reserved.
            </p>
            <a
              href="https://github.com/Alaa-din/mci-converter"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm mt-2 transition-colors"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks
              .filter((link) => link.filled)
              .map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 hover:bg-blue-500/30 border border-white/20 hover:border-blue-400/50 rounded-lg transition-all hover:scale-110"
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5 text-white/80 hover:text-white" />
                  </a>
                );
              })}
          </div>
        </div>
      </div>
    </footer>
  );
}
