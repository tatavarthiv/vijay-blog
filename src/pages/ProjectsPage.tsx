import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ContentCard from "../components/common/ContentCard";
import { useContentService } from "../context/contentServiceContext";
import type { Project } from "../types/content";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const contentService = useContentService();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const fetchedProjects = await contentService.getProjects();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [contentService]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="projects-page">
      {loading ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Loading projects...
        </motion.p>
      ) : projects.length > 0 ? (
        <motion.div
          className="projects-list"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, index) => (
            <motion.div key={project.id} variants={itemVariants} custom={index}>
              <ContentCard
                title={project.title}
                excerpt={project.description}
                slug={project.slug}
                linkPrefix="/projects/"
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          No projects found.
        </motion.p>
      )}
    </div>
  );
}
