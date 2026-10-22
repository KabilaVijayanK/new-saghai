export type ActivePage = 
  | 'home' 
  | 'about' 
  | 'services' 
  | 'products' 
  | 'industries' 
  | 'capabilities' 
  | 'projects' 
  | 'contact';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Vessels & Tanks' | 'Earthmoving & Mining' | 'Industrial Machinery' | 'Process Equipment';
  material: string;
  weight?: string;
  dimensions?: string;
  description: string;
  application: string;
  keySpecs: string[];
  image?: string;
  featured?: boolean;
}

export interface ProductCategory {
  id: string;
  title: string;
  description: string;
  typicalMaterials: string[];
  examples: string[];
  images?: string[];
  applicableStandards?: string;
}

export interface IndustrySector {
  id: string;
  name: string;
  tagline: string;
  description: string;
  keyComponents: string[];
  demandingFactors: string[];
}

export interface CapabilityDetail {
  id: string;
  title: string;
  capacity: string;
  description: string;
  specifications: string[];
  highlight: string;
}

export interface RFQFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  productCategory: string;
  quantity: string;
  material: string;
  requirement: string;
  message: string;
  files: string[];
}
