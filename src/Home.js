import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Tag,
  Text,
  Flex,
  Image,
  Wrap,
  WrapItem,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import profileImage from './Image/profile.png';
import figmaImg from './Image/figma.png';
import adobeImg from './Image/adobe.png';
import reactImg from './Image/react.png';
import bootstrapImg from './Image/bootstrap.png';
import phpImg from './Image/php.png';
import javaImg from './Image/java.png';
import chakraImg from './Image/chakra.png';
import nodejsImg from './Image/node.png';
import tailwindImg from './Image/tailwind.png';
import pythonImg from './Image/python.png';
import html5Img from './Image/html.png';
import css3Img from './Image/css.png';
import csharpImg from './Image/c#.png';
import heatmapDemoVideo from './Video/heatmap.mp4';
import GrantTrackDemoVideo from './Video/granttrack.mp4'
import fixitFinderDemoVideo from './Video/fixitfinder.mp4'

// --- Floating Particle Tech Background Component ---
const FloatingTechCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Prevent particles from getting trapped off-screen after resize
      particles.forEach((p) => {
        p.x = Math.min(p.x, canvas.width);
        p.y = Math.min(p.y, canvas.height);
      });
    };

    const particleCount = 45;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (window.innerWidth || 1000),
        y: Math.random() * (window.innerHeight || 1000),
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];

        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p1.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(147, 51, 234, ${1 - dist / 130})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <Box
      as="canvas"
      ref={canvasRef}
      position="fixed"
      top={0}
      left={0}
      w="100vw"
      h="100vh"
      pointerEvents="none"
      zIndex={0}
      opacity={0.65}
    />
  );
};

// Data Arrays
export const projects = [
  {
    slug: 'granttrackph',
    title: 'GrantTrackPH',
    description:
      'A comprehensive tracking system designed to streamline grant applications and monitoring for local initiatives.',
    tools: ['React', 'Chakra UI', 'Figma', 'MongoDB'],
    video: GrantTrackDemoVideo,
    problem:
      'Addresses the inefficient manual processes of paper-based applications, disorganized Excel Tracking, lost requirements and the lack of status visibility for the student applicants.',
    solution:
      'A Web-based platform that digitizes the entire process through an application form, status displays, filtering options and a dashboard summary of applications.',
    keyFeatures: ['Grant tracking workflow', 'Responsive dashboard', 'Clean UI/UX layout', 'Monitoring status updates'],
    role: 'UI/UX Designer and Frontend Developer',
  },
  {
    slug: 'heatmap-malnutrition-monitoring',
    title: 'Smart Heatmap-Based Malnutrition Monitoring System',
    description:
      'A data-driven system for LGU of Sibalom, Antique to visualize and target malnutrition hotspots using Python and Firebase.',
    tools: ['HTML', 'CSS', 'API Integration', 'Python', 'Firebase'],
    video: heatmapDemoVideo,
    problem:
      'In rural municipalities like Sibalom, Antique, Local Government Units (LGUs) and health workers rely on manual, paper-and-pencil methods to gather, record, and track child malnutrition metrics.',
    solution:
      'A Smart Heatmap-Based Malnutrition Monitoring System is a centralized, web-based platform that replaces slow paperwork with instant, data-driven digital operations.',
    keyFeatures: ['Heatmap visualization', 'Child Monitoring Module', 'Risk Flagging System', 'Analytics Dashboard'],
    role: 'Frontend Developer and UI Designer',
  },
  {
    slug: 'fix-it-finder',
    title: 'Fix-it-Finder',
    description:
      'A Cross Platform Application Navigator for Best Local Repair Shops within San Jose De Buenavista Antique.',
    role: 'UI/UX Designer',
    tools: ['Figma'],
    video: fixitFinderDemoVideo,
    problem:
      'Modern consumer habits heavily favor a "throwaway culture," where items like electronics, appliances, and vehicles are discarded and replaced after a single use or minor damage.',
    solution:
      'Fix-it Finder is a specialized mobile application engineered to bridge the gap between eco-conscious consumers and hard-to-find local repair shops in Southern Antique.',
    keyFeatures: ['Local Repair Locator', 'Pickup & Delivery Services', 'Dynamic Booking Flow', 'Vetted Portfolios & Reviews'],
  },
];

export const techStack = [
  { name: 'Figma', category: 'Design', image: figmaImg },
  { name: 'Adobe Photoshop', category: 'Design', image: adobeImg },
  { name: 'ReactJS', category: 'Frontend', image: reactImg },
  { name: 'Bootstrap', category: 'Frontend', image: bootstrapImg },
  { name: 'PHP', category: 'Backend', image: phpImg },
  { name: 'Java', category: 'Backend', image: javaImg },
  { name: 'Chakra UI', category: 'Frontend', image: chakraImg },
  { name: 'Node.js', category: 'Backend', image: nodejsImg },
  { name: 'Python', category: 'Backend', image: pythonImg },
  { name: 'C#', category: 'Backend', image: csharpImg},
  { name: 'HTML5', category: 'Frontend', image: html5Img },
  { name: 'CSS3', category: 'Frontend', image: css3Img },
  { name: 'Tailwind CSS', category: 'Frontend', image: tailwindImg },
];

const TechBadge = ({ name, image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Tag
        size="lg"
        px={5}
        py={2.5}
        borderRadius="full"
        bg="rgba(15, 23, 42, 0.6)"
        color="gray.200"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.1)"
        backdropFilter="blur(16px)"
        cursor="default"
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        _hover={{
          bg: 'rgba(15, 23, 42, 0.95)',
          borderColor: 'cyan.400',
          color: 'cyan.300',
          boxShadow: '0 0 18px -2px rgba(56, 189, 248, 0.35)',
        }}
      >
        <Flex align="center" gap={2.5}>
          {image ? (
            <Image
              src={image}
              alt={name}
              boxSize="20px"
              objectFit="contain"
            />
          ) : (
            <Flex
              boxSize="18px"
              align="center"
              justify="center"
              fontSize="9px"
              fontWeight="bold"
              color="cyan.400"
              bg="rgba(56, 189, 248, 0.15)"
              borderRadius="full"
            >
              {name.slice(0, 2).toUpperCase()}
            </Flex>
          )}
          <Text fontSize="sm" fontWeight="medium" letterSpacing="wide">
            {name}
          </Text>
        </Flex>
      </Tag>
    </motion.div>
  );
};

const Home = () => {
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();

  const mutedText = 'gray.300';

  const categories = ['All', 'Frontend', 'Backend', 'Design'];
  const filteredTech =
    activeTab === 'All'
      ? techStack
      : techStack.filter((t) => t.category === activeTab);

  return (
    <Box position="relative" bg="#030712" minH="100vh" overflow="hidden">
      <FloatingTechCanvas />

      {/* Background Lighting Elements */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: '10%',
          left: '15%',
          width: '450px',
          height: '450px',
          background:
            'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          bottom: '10%',
          right: '10%',
          width: '550px',
          height: '550px',
          background:
            'radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(0,0,0,0) 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxW="7xl" py={{ base: 8, md: 12 }} color="white" position="relative" zIndex={1}>
        <Stack spacing={20}>
          
          {/* Hero Section */}
          <Box as="section" py={4} px={{ base: 4, md: 0 }}>
            <Flex
              direction={{ base: 'column-reverse', md: 'row' }}
              align="center"
              justify="space-between"
              gap={10}
            >
              <Stack spacing={6} maxW="3xl">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  <Heading size="2xl" color="white" letterSpacing="tight">
                    Ferly Mae V. De Mesa
                  </Heading>
                  <Stack spacing={2} mt={3}>
                    <Flex align="center" gap={2} color="cyan.400">
                      <Box as="span" fontSize="md" lineHeight="1">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 21s-6-4.35-6-10a6 6 0 1 1 12 0c0 5.65-6 10-6 10Z" />
                          <circle cx="12" cy="11" r="2.5" />
                        </svg>
                      </Box>
                      <Text fontSize="md" fontWeight="medium">Antique, Philippines</Text>
                    </Flex>
                  </Stack>
                </motion.div>
                <Text fontSize="lg" maxW="2xl" color={mutedText}>
                  Hi I'm Ferly, an aspiring UI/UX designer. Passionate about creating intuitive, responsive, and visually balanced interfaces, I enjoy combining technical problem-solving with creativity to design seamless digital experiences that connect users with technology effortlessly.
                </Text>
              </Stack>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Box flexShrink={0} position="relative">
                  <Box
                    position="absolute"
                    inset="-4px"
                    bgGradient="linear(to-r, cyan.400, purple.500)"
                    borderRadius="full"
                    filter="blur(10px)"
                    opacity={0.7}
                  />
                  <Image
                    src={profileImage}
                    alt="Ferly Mae"
                    boxSize={{ base: '180px', md: '240px' }}
                    objectFit="cover"
                    borderRadius="full"
                    border="2px solid"
                    borderColor="whiteAlpha.500"
                    shadow="2xl"
                    position="relative"
                  />
                </Box>
              </motion.div>
            </Flex>
          </Box>

          {/* Education Section */}
          <Box as="section" id="education" py={4} px={{ base: 4, md: 0 }}>
            <Heading size="xl" mb={8} textTransform="uppercase" letterSpacing="widest" color="white">
              EDUCATION
            </Heading>

            <Stack spacing={0} borderTop="1px solid" borderColor="whiteAlpha.200">
              {[
                {
                  title: "Bachelor of Science in Information Technology",
                  school: "St. Anthony's College",
                  location: "San Angel, San Jose, Antique",
                  date: "2022 — 2026",
                },
                {
                  title: "Senior High School — STEM",
                  school: "Antique Vocational School",
                  location: "Ilaya, Bugasong, Antique",
                  date: "2020 — 2022",
                },
                {
                  title: "Junior High School",
                  school: "Antique Vocational School",
                  location: "Ilaya, Bugasong, Antique",
                  date: "2016 — 2020",
                },
                {
                  title: "Elementary Education",
                  school: "Guija, Sabang-West Elementary School",
                  location: "Guija, Bugasong, Antique",
                  date: "2016",
                },
              ].map((item, index) => (
                <Box
                  key={index}
                  py={6}
                  px={{ base: 2, md: 4 }}
                  borderBottom="1px solid"
                  borderColor="whiteAlpha.100"
                  transition="all 0.3s ease"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.02)",
                    borderColor: "cyan.500",
                  }}
                >
                  <Flex
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align={{ base: "start", md: "baseline" }}
                    gap={{ base: 2, md: 6 }}
                  >
                    <Box flex="1">
                      <Text fontSize="lg" fontWeight="semibold" color="white">
                        {item.title}
                      </Text>
                      <Text fontSize="sm" color="gray.400" mt={1}>
                        {item.school} &bull;{" "}
                        <Text as="span" color="gray.500">
                          {item.location}
                        </Text>
                      </Text>
                    </Box>
                    <Text
                      fontSize="sm"
                      fontFamily="mono"
                      color="cyan.400"
                      fontWeight="medium"
                      mt={{ base: 2, md: 0 }}
                    >
                      {item.date}
                    </Text>
                  </Flex>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Experience Section */}
          <Box as="section" id="experience" py={4} px={{ base: 4, md: 0 }}>
            <Heading size="xl" mb={8} textTransform="uppercase" letterSpacing="widest" color="white">
              EXPERIENCE
            </Heading>

            <Stack spacing={0} borderTop="1px solid" borderColor="whiteAlpha.200">
              {[
                {
                  role: "UI/UX Design | Front End Dev Intern",
                  company: "TechnoPH Systems and Integration Inc.",
                  location: "Iloilo City, Philippines",
                  period: "2026",
                  description: "Assisted in designing user interfaces and implementing responsive frontend components for web applications.",
                },
              ].map((item, index) => (
                <Box
                  key={index}
                  py={6}
                  px={{ base: 2, md: 4 }}
                  borderBottom="1px solid"
                  borderColor="whiteAlpha.100"
                  transition="all 0.3s ease"
                  _hover={{
                    bg: "rgba(255, 255, 255, 0.02)",
                    borderColor: "cyan.500",
                  }}
                >
                  <Flex
                    direction={{ base: "column", md: "row" }}
                    justify="space-between"
                    align={{ base: "start", md: "baseline" }}
                    gap={{ base: 2, md: 6 }}
                  >
                    <Box flex="1">
                      <Text fontSize="lg" fontWeight="semibold" color="white">
                        {item.role}
                      </Text>
                      <Text fontSize="sm" color="gray.400" mt={1}>
                        {item.company} &bull;{" "}
                        <Text as="span" color="gray.500">
                          {item.location}
                        </Text>
                      </Text>
                      {item.description && (
                        <Text fontSize="sm" color={mutedText} mt={2} maxW="2xl">
                          {item.description}
                        </Text>
                      )}
                    </Box>
                    <Text
                      fontSize="sm"
                      fontFamily="mono"
                      color="cyan.400"
                      fontWeight="medium"
                      mt={{ base: 2, md: 0 }}
                    >
                      {item.period}
                    </Text>
                  </Flex>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Aesthetic Modern Glassmorphic Projects Section */}
          <Box as="section" id="projects" py={4} px={{ base: 4, md: 0 }}>
            <Flex align="center" justify="space-between" mb={10}>
              <Box>
                <Text fontSize="xs" fontFamily="mono" color="cyan.400" textTransform="uppercase" letterSpacing="widest" mb={1}>
                  Featured Work
                </Text>
                <Heading size="xl" textTransform="uppercase" letterSpacing="widest" color="white">
                  SELECTED PROJECTS
                </Heading>
              </Box>
            </Flex>

            <Stack spacing={8}>
              {projects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Box
                    role="button"
                    tabIndex={0}
                    position="relative"
                    borderRadius="2xl"
                    p={{ base: 6, md: 8 }}
                    bg="rgba(15, 23, 42, 0.4)"
                    border="1px solid"
                    borderColor="rgba(255, 255, 255, 0.08)"
                    backdropFilter="blur(16px)"
                    cursor="pointer"
                    overflow="hidden"
                    transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                    onClick={() => navigate(`/projects/${project.slug}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        navigate(`/projects/${project.slug}`);
                      }
                    }}
                    _hover={{
                      transform: 'translateY(-4px)',
                      borderColor: 'rgba(56, 189, 248, 0.4)',
                      boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px -5px rgba(56, 189, 248, 0.15)',
                    }}
                    _groupHover="group"
                  >
                    {/* Ambient Glow Gradient inside card */}
                    <Box
                      position="absolute"
                      top="-50%"
                      right="-10%"
                      w="300px"
                      h="300px"
                      bg="radial-gradient(circle, rgba(56,189,248,0.08) 0%, rgba(0,0,0,0) 70%)"
                      filter="blur(50px)"
                      pointerEvents="none"
                    />

                    <Flex
                      direction={{ base: 'column', md: 'row' }}
                      justify="space-between"
                      align={{ base: 'start', md: 'stretch' }}
                      gap={{ base: 6, md: 8 }}
                    >
                      <Stack spacing={4} flex="1">
                        <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
                          <HStack spacing={3}>
                            <Text
                              fontSize="xs"
                              fontFamily="mono"
                              px={2.5}
                              py={0.5}
                              borderRadius="md"
                              bg="rgba(56, 189, 248, 0.1)"
                              color="cyan.400"
                              border="1px solid"
                              borderColor="rgba(56, 189, 248, 0.2)"
                            >
                              0{index + 1}
                            </Text>
                            {project.role && (
                              <Badge
                                variant="subtle"
                                bg="rgba(255, 255, 255, 0.05)"
                                color="gray.300"
                                fontSize="xs"
                                textTransform="none"
                                borderRadius="full"
                                px={3}
                                py={0.5}
                                fontWeight="normal"
                              >
                                {project.role}
                              </Badge>
                            )}
                          </HStack>

                          {/* Top Action Arrow Button */}
                          <Flex
                            align="center"
                            gap={2}
                            color="cyan.400"
                            fontSize="sm"
                            fontWeight="medium"
                            transition="all 0.3s ease"
                            className="project-link"
                          >
                            <Text fontSize="xs" textTransform="uppercase" letterSpacing="wider" opacity={0.8}>
                              View Case Study
                            </Text>
                            <Box
                              transition="transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                              _groupHover={{ transform: 'translate(4px, -4px)' }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                              </svg>
                            </Box>
                          </Flex>
                        </Flex>

                        <Heading size="lg" color="white" fontWeight="semibold" letterSpacing="tight">
                          {project.title}
                        </Heading>

                        <Text fontSize="md" color="gray.300" lineHeight="relaxed">
                          {project.description}
                        </Text>

                        {/* Tools list badges */}
                        <HStack spacing={2} wrap="wrap" pt={2}>
                          {project.tools.map((tool) => (
                            <Tag
                              key={tool}
                              size="sm"
                              bg="rgba(255, 255, 255, 0.04)"
                              color="gray.300"
                              border="1px solid"
                              borderColor="rgba(255, 255, 255, 0.08)"
                              fontSize="xs"
                              borderRadius="full"
                              px={3.5}
                              py={1}
                            >
                              {tool}
                            </Tag>
                          ))}
                        </HStack>
                      </Stack>
                    </Flex>
                  </Box>
                </motion.div>
              ))}
            </Stack>
          </Box>

          {/* Centered Clean Tech Stack Section */}
          <Box as="section" id="techstack" py={6} px={{ base: 4, md: 0 }}>
            <Stack spacing={6} align="center" textAlign="center">
              <Box>
                <Heading size="xl" textTransform="uppercase" letterSpacing="widest" color="white">
                  TECHSTACK
                </Heading>
              </Box>

              <Flex gap={2} wrap="wrap" justify="center">
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    size="xs"
                    rounded="full"
                    px={4}
                    variant={activeTab === cat ? 'solid' : 'ghost'}
                    bg={activeTab === cat ? 'cyan.400' : 'rgba(255, 255, 255, 0.05)'}
                    color={activeTab === cat ? 'black' : 'gray.400'}
                    fontWeight="semibold"
                    _hover={{
                      bg: activeTab === cat ? 'cyan.300' : 'rgba(255, 255, 255, 0.1)',
                      color: activeTab === cat ? 'black' : 'white',
                    }}
                    onClick={() => setActiveTab(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </Flex>

              <Wrap spacing={3.5} justify="center" align="center" maxW="4xl" mx="auto">
                {filteredTech.map((tech, index) => (
                  <WrapItem key={index}>
                    <TechBadge name={tech.name} image={tech.image} />
                  </WrapItem>
                ))}
              </Wrap>
            </Stack>
          </Box>

        </Stack>
      </Container>
    </Box>
  );
};

export default Home;