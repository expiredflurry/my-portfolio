import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Heading,
  Text,
  Tag,
  Button,
  Image,
  Badge,
  VStack,
  Grid,
  GridItem,
  Flex,
  Link,
  Icon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { projects } from './Home';

// Custom External Link Icon (SVG)
const ExternalLinkIcon = (props) => (
  <Icon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </Icon>
);

// --- Reusable Tech Background Canvas ---
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

const ProjectDetail = () => {
  const { projectSlug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectSlug]);

  const currentIndex = projects.findIndex((p) => p.slug === projectSlug);
  const project = projects[currentIndex];

  if (!project) {
    return (
      <Box minH="100vh" bg="#030712" color="white" pt={32} textAlign="center">
        <Heading size="lg" mb={4}>
          Case Study Not Found
        </Heading>
        <Button colorScheme="cyan" onClick={() => navigate('/')}>
          Return Home
        </Button>
      </Box>
    );
  }

  // Define target link for GrantTrack
  const grantTrackUrl =
    project.websiteUrl || project.liveUrl || 'https://dashboard.granttrackph.com/';

  return (
    <Box position="relative" bg="#030712" minH="100vh" overflow="hidden" pb={24}>
      <FloatingTechCanvas />

      {/* Ambient Radial Glows */}
      <Box
        position="fixed"
        top="5%"
        left="15%"
        w="500px"
        h="500px"
        bg="radial-gradient(circle, rgba(56,189,248,0.12) 0%, rgba(0,0,0,0) 70%)"
        filter="blur(100px)"
        pointerEvents="none"
        zIndex={0}
      />
      <Box
        position="fixed"
        bottom="10%"
        right="15%"
        w="600px"
        h="600px"
        bg="radial-gradient(circle, rgba(168,85,247,0.14) 0%, rgba(0,0,0,0) 70%)"
        filter="blur(110px)"
        pointerEvents="none"
        zIndex={0}
      />

      <Container maxW="6xl" pt={{ base: 6, md: 10 }} color="white" position="relative" zIndex={1}>
        {/* Navigation Action */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            color="cyan.400"
            _hover={{ bg: 'rgba(56, 189, 248, 0.1)', color: 'cyan.300' }}
            leftIcon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            }
            mb={8}
            borderRadius="full"
            px={5}
          >
            Back to Projects
          </Button>
        </motion.div>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VStack align="flex-start" spacing={4} mb={10}>
            <Badge
              px={3.5}
              py={1}
              borderRadius="full"
              bg="rgba(56, 189, 248, 0.15)"
              color="cyan.300"
              border="1px solid rgba(56, 189, 248, 0.3)"
              fontSize="xs"
              letterSpacing="wider"
              textTransform="uppercase"
            >
              Case Study
            </Badge>

            <Heading
              size="2xl"
              letterSpacing="tight"
              lineHeight="shorter"
              bgGradient="linear(to-r, white, gray.300)"
              bgClip="text"
            >
              {project.title}
            </Heading>
          </VStack>
        </motion.div>

        {/* Media Player Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Box
            borderRadius="2xl"
            overflow="hidden"
            border="1px solid rgba(255, 255, 255, 0.1)"
            bg="rgba(15, 23, 42, 0.6)"
            backdropFilter="blur(16px)"
            boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px -10px rgba(56, 189, 248, 0.15)"
            mb={16}
          >
            {project.video ? (
              <Box as="video" controls autoPlay loop muted w="100%" maxH="600px" objectFit="cover">
                <source src={project.video} type="video/mp4" />
                Your browser does not support the video tag.
              </Box>
            ) : (
              <Image
                src={project.image}
                alt={project.title}
                w="100%"
                maxH="600px"
                objectFit="cover"
              />
            )}
          </Box>
        </motion.div>

        {/* Seamless Content Grid */}
        <Grid templateColumns={{ base: '1fr', lg: '3fr 1fr' }} gap={10} mb={16}>
          <GridItem>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <VStack align="stretch" spacing={8}>
                {/* Project Overview */}
                <Box>
                  <Heading size="md" mb={4} color="white">
                    Project Overview
                  </Heading>
                  <Text color="gray.300" lineHeight="relaxed" fontSize="md">
                    {project.overview || project.description}
                  </Text>
                </Box>

                {/* Website Link Section - Rendered ONLY for GrantTrack */}
                {project.slug === 'granttrack' && (
                  <Box>
                    <Heading size="md" mb={4} color="white">
                      Website Link
                    </Heading>
                    <Button
                      as={Link}
                      href={grantTrackUrl}
                      isExternal
                      rightIcon={<ExternalLinkIcon boxSize={4} />}
                      bg="rgba(56, 189, 248, 0.1)"
                      color="cyan.300"
                      border="1px solid rgba(56, 189, 248, 0.3)"
                      _hover={{
                        bg: 'rgba(56, 189, 248, 0.2)',
                        color: 'white',
                        borderColor: 'cyan.400',
                        textDecoration: 'none',
                        transform: 'translateY(-2px)',
                      }}
                      _active={{ bg: 'rgba(56, 189, 248, 0.25)' }}
                      transition="all 0.2s ease"
                      borderRadius="lg"
                      px={6}
                      py={5}
                      fontSize="sm"
                      fontWeight="semibold"
                    >
                      Visit Live Website
                    </Button>
                  </Box>
                )}
              </VStack>
            </motion.div>
          </GridItem>

          <GridItem>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <VStack align="stretch" spacing={6}>
                {/* Role */}
                <Box>
                  <Text fontSize="xs" fontFamily="mono" color="gray.400" textTransform="uppercase" letterSpacing="wider" mb={1}>
                    Role
                  </Text>
                  <Text color="white" fontWeight="semibold" fontSize="sm">
                    {project.role || 'Lead Full-Stack Developer'}
                  </Text>
                </Box>

                {/* Tools Used */}
                <Box>
                  <Text fontSize="xs" fontFamily="mono" color="gray.400" textTransform="uppercase" letterSpacing="wider" mb={3}>
                    Tools & Technologies
                  </Text>
                  <Flex wrap="wrap" gap={2}>
                    {project.tools?.map((tool) => (
                      <Tag
                        key={tool}
                        size="sm"
                        bg="rgba(56, 189, 248, 0.08)"
                        color="cyan.300"
                        border="1px solid rgba(56, 189, 248, 0.2)"
                        borderRadius="full"
                        px={3}
                        py={1}
                      >
                        {tool}
                      </Tag>
                    ))}
                  </Flex>
                </Box>
              </VStack>
            </motion.div>
          </GridItem>
        </Grid>

        {/* Problem & Solution Section */}
        {(project.problem || project.solution) && (
          <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={12} pt={4}>
            {project.problem && (
              <GridItem>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Box>
                    <Heading size="md" mb={4} color="white">
                      The Problem
                    </Heading>
                    <Text color="gray.300" lineHeight="relaxed" fontSize="md">
                      {project.problem}
                    </Text>
                  </Box>
                </motion.div>
              </GridItem>
            )}

            {project.solution && (
              <GridItem>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Box>
                    <Heading size="md" mb={4} color="white">
                      The Solution
                    </Heading>
                    <Text color="gray.300" lineHeight="relaxed" fontSize="md">
                      {project.solution}
                    </Text>
                  </Box>
                </motion.div>
              </GridItem>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default ProjectDetail;