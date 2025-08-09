"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Calendar, MapPin, Code, Rocket, Zap } from "lucide-react";

const experiences = [
  {
    id: 1,
    company: "TechNova Solutions",
    role: "Senior Full Stack Developer",
    duration: "2022 - Present",
    location: "San Francisco, CA",
    technologies: ["React", "Node.js", "AWS", "TypeScript", "GraphQL"],
  },
  {
    id: 2,
    company: "CyberCore Industries",
    role: "Frontend Developer",
    duration: "2020 - 2022",
    location: "Austin, TX",
    technologies: ["Vue.js", "React Native", "SCSS", "Firebase"],
  },
  {
    id: 3,
    company: "DataFlow Systems",
    role: "Junior Software Engineer",
    duration: "2019 - 2020",
    location: "Seattle, WA",
    technologies: ["Python", "Django", "PostgreSQL", "Docker"],
  },
  {
    id: 4,
    company: "StartupLab",
    role: "Software Development Intern",
    duration: "2018 - 2019",
    location: "Remote",
    technologies: ["JavaScript", "Express.js", "MongoDB", "Git"],
  },
];

export default function WorkExperience() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Zap className="w-8 h-8 text-cyan-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Work Experience
            </h1>
            <Rocket className="w-8 h-8 text-purple-400" />
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Journey through my professional development career, building
            innovative solutions and leading technical excellence.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-400 to-purple-400"></div>

            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative mb-12 last:mb-0">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full border-4 border-slate-900 shadow-lg shadow-cyan-400/50"></div>

                {/* Experience Card */}
                <div className="ml-20">
                  <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm transition-all duration-500 hover:bg-slate-800/70 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/20">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Building2 className="w-4 h-4 text-cyan-400" />
                            <h3 className="text-lg font-bold text-white">
                              {exp.company}
                            </h3>
                          </div>
                          <h4 className="text-base font-semibold text-cyan-400 mb-2">
                            {exp.role}
                          </h4>
                          <div className="flex items-center gap-4 text-slate-400 text-sm mb-3">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {exp.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {exp.location}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-slate-700 text-cyan-400 border-slate-600 hover:bg-slate-600 text-xs"
                          >
                            <Code className="w-2 h-2 mr-1" />
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
