import {
  SiPython, SiJavascript, SiTypescript, SiCplusplus, SiPhp,
  SiHtml5, SiCss3, SiFlask, SiReact, SiNodedotjs,
  SiGithub, SiDocker, SiMongodb,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';
import type { IconType } from 'react-icons';

export const skillIconMap: Record<string, IconType> = {
  'Python': SiPython,
  'JavaScript': SiJavascript,
  'Javascript': SiJavascript,
  'Typescript': SiTypescript,
  'TypeScript': SiTypescript,
  'C++': SiCplusplus,
  'Java': FaJava,
  'PHP': SiPhp,
  'HTML': SiHtml5,
  'CSS': SiCss3,
  'Flask (python)': SiFlask,
  'React.js': SiReact,
  'Node.js (express)': SiNodedotjs,
  'GitHub': SiGithub,
  'Docker': SiDocker,
  'MongoDB': SiMongodb,
  'VS Code': VscCode,
};
