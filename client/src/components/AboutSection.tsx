
/**
 * AboutSection.tsx
 * 
 * Seção "Sobre a Psicóloga" do site
 * Apresenta informações profissionais, qualificações e abordagem terapêutica
 * Contém cards com especialidades e animações de entrada suave
 * Utiliza Intersection Observer para ativar animações ao rolar a página
 */

import { motion } from "framer-motion";
import { 
  Brain, 
  Heart, 
  BookOpen, 
  Users, 
  Award, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Star,
  CheckCircle,
  Camera,
  Stethoscope, Activity, Zap, Shield, Target,
  UserPlus, UserCheck, UserX, UserCog, Sun, Moon, Sparkles,
  MessageCircle, MessageSquare, Mic, Volume2, TrendingUp, BarChart, PieChart, Gauge,
  Leaf, Flower, TreePine, Wind, Handshake, HelpCircle, LifeBuoy, Umbrella,
  Home, Gamepad2, Puzzle, Palette, Footprints, Waves, Mountain, Compass,
  Timer, Calendar, Hourglass
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { processTextWithGradient, processBadgeWithGradient } from "@/utils/textGradient";
import Avatar from "./Avatar";
import type { Specialty } from "@shared/schema";

export function AboutSection() {
  const { data: configs } = useQuery({
    queryKey: ["/api/admin/config"],
    queryFn: async () => {
      const response = await fetch("/api/admin/config");
      return response.json();
    },
  });

  const heroImage = configs?.find((c: any) => c.key === "hero_image");
  const customImage = heroImage?.value?.path || null;

  const generalInfo = configs?.find((c: any) => c.key === "general_info")?.value as any || {};
  // Obtém dados das configurações
  const aboutSection = configs?.find((c: any) => c.key === 'about_section')?.value as any || {};
  const badgeGradient = configs?.find(c => c.key === 'badge_gradient')?.value?.gradient;
  const currentCrp = generalInfo.crp || "08/123456";
  const aboutText = aboutSection.description || "";

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="about" 
      data-section="about" 
      className="relative py-20 lg:py-32 bg-gradient-to-b from-slate-50/30 via-white to-slate-50/20 overflow-hidden" 
      style={{ margin: 0, padding: 0 }}
      ref={ref}
    >
      {/* Background elements minimalistas */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-purple-100/30 via-pink-50/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-gradient-to-br from-blue-100/30 via-indigo-50/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-rose-100/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          
          {/* Layout com uma coluna - design simplificado */}
          <div className="max-w-4xl mx-auto">
            
            {/* Informações principais */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-12"
            >
              {/* Header da seção */}
              <div className="text-center space-y-6">
                <motion.h2 
                  className="font-light text-3xl lg:text-4xl xl:text-5xl text-slate-800 tracking-tight leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  {processTextWithGradient(generalInfo.name || "Dra. (Adrielle Benhossi)", badgeGradient)}
                </motion.h2>
                
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex items-center justify-center gap-3 text-purple-600"
                >
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-lg">
                      {(() => {
                        const professionalTitleInfo = configs?.find((c: any) => c.key === "professional_title")?.value as any || {};
                        return professionalTitleInfo.title || "Psicóloga Clínica";
                      })()}
                    </p>
                    <p className="text-sm text-slate-500">CRP: {currentCrp}</p>
                  </div>
                </motion.div>
              </div>

              {/* Descrição */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="prose prose-lg max-w-none text-center"
              >
                <div className="text-slate-600 leading-relaxed text-lg font-light space-y-4">
                  {(aboutText || "Este é o espaço para escrever sobre você no painel administrativo.")
                    .split('\n')
                    .map((paragraph, index) => (
                      <p key={index} className={`${index > 0 ? "mt-4" : ""} leading-relaxed`}>
                        {paragraph}
                      </p>
                    ))
                  }
                </div>
              </motion.div>

              {/* Cards de formação - Layout otimizado para mobile */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto"
              >
                {(() => {
                  const aboutCredentials = configs?.find((c: any) => c.key === "about_credentials")?.value as any[] || [];
                  const activeCredentials = aboutCredentials
                    .filter(cred => cred.isActive !== false)
                    .sort((a, b) => (a.order || 0) - (b.order || 0));

                  if (activeCredentials.length === 0) {
                    // Dados padrão otimizados para mobile
                    return (
                      <>
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={isVisible ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.6 }}
                          className="group relative bg-gradient-to-br from-pink-50 to-purple-50 p-4 md:p-6 rounded-2xl border border-pink-100/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                        >
                          <div className="absolute top-3 right-3 w-2 h-2 bg-pink-400 rounded-full opacity-60"></div>
                          <div className="font-semibold text-slate-800 mb-1 text-sm md:text-base">Centro Universitário Integrado</div>
                          <div className="text-xs md:text-sm text-slate-500">Formação Acadêmica</div>
                        </motion.div>
                        
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={isVisible ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.7 }}
                          className="group relative bg-gradient-to-br from-purple-50 to-indigo-50 p-4 md:p-6 rounded-2xl border border-purple-100/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                        >
                          <div className="absolute top-3 right-3 w-2 h-2 bg-purple-400 rounded-full opacity-60"></div>
                          <div className="font-semibold text-slate-800 mb-1 text-sm md:text-base">Terapia Cognitivo-Comportamental</div>
                          <div className="text-xs md:text-sm text-slate-500">Abordagem Terapêutica</div>
                        </motion.div>
                        
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={isVisible ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.5, delay: 0.8 }}
                          className="group relative bg-gradient-to-br from-green-50 to-teal-50 p-4 md:p-6 rounded-2xl border border-green-100/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] md:col-span-2 lg:col-span-1"
                        >
                          <div className="absolute top-3 right-3 w-2 h-2 bg-green-400 rounded-full opacity-60"></div>
                          <div className="font-semibold text-slate-800 mb-1 text-sm md:text-base">Escuta clínica em Inglês</div>
                          <div className="text-xs md:text-sm text-slate-500">Espaço terapêutico bilíngue</div>
                        </motion.div>
                      </>
                    );
                  }

                  return activeCredentials.map((credential: any, index: number) => (
                    <motion.div 
                      key={credential.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                      className={`group relative bg-gradient-to-br ${credential.gradient} p-4 md:p-6 rounded-2xl border border-white/20 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
                    >
                      <div className="absolute top-3 right-3 w-2 h-2 bg-white/60 rounded-full"></div>
                      <div className="font-semibold text-slate-800 mb-1 text-sm md:text-base">{credential.title}</div>
                      <div className="text-xs md:text-sm text-slate-500">{credential.subtitle}</div>
                    </motion.div>
                  ));
                })()}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
