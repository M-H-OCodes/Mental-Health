import React from 'react';
import { ArrowLeft, ExternalLink, ShieldCheck, Heart, BookOpen } from 'lucide-react';

interface GuideViewProps {
  onBack: () => void;
  onNavigate: (view: string) => void;
}

export const GuideView: React.FC<GuideViewProps> = ({ onBack, onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#86d3bf] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-[#d7fff2] p-6 sm:p-12 rounded-2xl shadow-xl border border-[#A4D7C9]">
        {/* Title */}
        <div className="text-center pb-6 mb-8 border-b-2 border-[#6C63FF]">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2a6252] mb-2">
            Understanding Mental Well-being
          </h1>
          <p className="text-sm sm:text-base text-[#3a7565]">
            A comprehensive, evidence-based guide for adolescents, families, and mentors.
          </p>
        </div>

        {/* Section 1 */}
        <div id="section-1" className="mb-12 scroll-mt-24">
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
            <div className="w-full lg:w-2/5 shrink-0 rounded-2xl overflow-hidden shadow-md bg-white">
              <img
                src="/images/your-head-and-heart-s.jpg"
                alt="Mental Well-being Concept"
                className="w-full h-64 lg:h-80 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/mental-health.jpg';
                }}
              />
            </div>
            <div className="flex-1 text-[#444444] text-base leading-relaxed text-justify space-y-4">
              <h2 className="text-2xl font-bold text-[#3a7565]">What is Mental Well-being?</h2>
              <p>
                Mental well-being is a multifaceted state of emotional, psychological, and social harmony that enables individuals to cope with life's challenges, form meaningful relationships, and pursue personal growth. The{' '}
                <a
                  href="https://www.who.int/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6C63FF] hover:underline font-semibold"
                >
                  World Health Organization (WHO)
                </a>{' '}
                emphasizes that mental well-being transcends the mere absence of mental disorders; it encompasses resilience, purpose, and the capacity to contribute meaningfully to society.
              </p>
              <p>
                For adolescents, this balance is particularly vital, as it influences their developmental trajectory, shaping academic performance, social interactions, and long-term health outcomes. Factors such as biological predispositions, environmental stressors, and lived experiences dynamically interact to shape mental well-being, underscoring the need for proactive measures—such as accessible education and community support—to nurture this equilibrium.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div id="section-2" className="mb-12 scroll-mt-24">
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
            <div className="w-full lg:w-2/5 shrink-0 rounded-2xl overflow-hidden shadow-md bg-white">
              <img
                src="/images/shutterstock_611098478.jpg"
                alt="Mental Health Challenges"
                className="w-full h-64 lg:h-80 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/mental-health.jpg';
                }}
              />
            </div>
            <div className="flex-1 text-[#444444] text-base leading-relaxed text-justify space-y-4">
              <h2 className="text-2xl font-bold text-[#3a7565]">Issues Surrounding Mental Well-being</h2>
              <p>
                Contemporary adolescents face unprecedented mental health challenges, amplified by societal shifts and systemic inequities. Research reveals that{' '}
                <strong className="text-[#2a6252]">1 in 3 adolescents</strong> experiences anxiety or depression during their formative years, a crisis exacerbated by the isolation and uncertainty of the COVID-19 pandemic (
                <a
                  href="https://link.springer.com/article/10.1007/s12187-020-09780-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6C63FF] hover:underline font-semibold"
                >
                  Springer, 2020
                </a>
                ).
              </p>
              <p>
                The digital age has introduced new threats, with{' '}
                <strong className="text-[#2a6252]">59% of teens globally</strong> reporting experiences of cyberbullying, which amplifies feelings of isolation and helplessness (
                <a
                  href="https://www.mdpi.com/1660-4601/18/7/3432"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6C63FF] hover:underline font-semibold"
                >
                  MDPI, 2021
                </a>
                ). Academic pressures further compound these struggles, as{' '}
                <strong className="text-[#2a6252]">70% of students</strong> report burnout due to relentless societal expectations and competition (
                <a
                  href="https://link.springer.com/article/10.1007/s11469-021-00529-8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6C63FF] hover:underline font-semibold"
                >
                  Springer, 2021
                </a>
                ).
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div id="section-3" className="mb-12 scroll-mt-24">
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
            <div className="w-full lg:w-2/5 shrink-0 rounded-2xl overflow-hidden shadow-md bg-white">
              <img
                src="/images/image.jpeg"
                alt="Well-being Practices"
                className="w-full h-64 lg:h-80 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/mental-health.jpg';
                }}
              />
            </div>
            <div className="flex-1 text-[#444444] text-base leading-relaxed text-justify space-y-4">
              <h2 className="text-2xl font-bold text-[#3a7565]">Practices to Promote Mental Well-being</h2>
              <p>
                Promoting mental well-being requires a holistic approach that combines individual practices, peer support, and institutional reforms. Mindfulness techniques, such as meditation and yoga, are proven to reduce stress and enhance emotional regulation, with resources like{' '}
                <a
                  href="https://www.verywellmind.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6C63FF] hover:underline font-semibold"
                >
                  Verywell Mind
                </a>{' '}
                offering accessible guidance.
              </p>
              <p>
                Social connectivity plays a pivotal role: platforms such as{' '}
                <a
                  href="https://themighty.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6C63FF] hover:underline font-semibold"
                >
                  The Mighty
                </a>{' '}
                provide safe spaces for individuals to share personal stories, fostering solidarity. Cognitive-behavioral strategies, including journaling and reframing negative thought patterns, are effective tools for building resilience, as evidenced by studies cited in{' '}
                <a
                  href="https://link.springer.com/article/10.1007/s11469-021-00529-8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6C63FF] hover:underline font-semibold"
                >
                  Springer, 2021
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Back and Action Buttons */}
        <div className="pt-6 border-t border-[#A4D7C9] flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 bg-[#6C63FF] hover:bg-[#5650d8] text-white px-6 py-2.5 rounded-full font-bold text-sm transition-colors cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>&larr; Back to Home Page</span>
          </button>

          <button
            onClick={() => onNavigate('blogs')}
            className="inline-flex items-center gap-2 bg-[#5AA59E] hover:bg-[#488b85] text-white px-6 py-2.5 rounded-full font-bold text-sm transition-colors cursor-pointer shadow-xs"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Community Blogs</span>
          </button>
        </div>
      </div>
    </div>
  );
};
