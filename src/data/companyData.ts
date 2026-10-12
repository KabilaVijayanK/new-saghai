import { ProjectItem, ProductCategory, IndustrySector, CapabilityDetail } from '../types';

export const COMPANY_INFO = {
  name: 'Saghai Engineering',
  tagline: 'Custom Engineered Products & Industrial Fabrication',
  established: 1978,
  experienceYears: '5+ Decades',
  coveredArea: '30,000+ Sq. Ft.',
  fabricationBays: '3 Bays',
  location: '540/1 Vellakinar, Coimbatore – 641029, Tamil Nadu, India',
  phone: '+91 95859 53545',
  email: 'Saghaiengg1978@gmail.com',
  workingHours: 'Mon – Sat: 8:30 AM – 6:30 PM IST',
};

export const APPROVED_CUSTOMERS = [
  { name: 'BEML', sector: 'Heavy Earthmoving & Defense', code: 'BEML' },
  { name: 'Revathi Equipment Limited (REL)', sector: 'Drilling & Mining Rigs', code: 'REL' },
  { name: 'LGB', sector: 'Automotive & Industrial Transmission', code: 'LGB' },
  { name: 'RUBFILA', sector: 'Elastomeric & Process Engineering', code: 'RUBFILA' },
  { name: 'ROOTS', sector: 'Cleaning & Industrial Machines', code: 'ROOTS' },
  { name: 'CRI', sector: 'Pumps & Fluid Handling Systems', code: 'CRI' },
];

export const CORE_SERVICES = [
  {
    id: 'laser-cutting',
    number: '01',
    title: 'Precision CNC Laser Cutting',
    shortTitle: 'Laser Cutting',
    description: 'CNC laser cutting for industrial components, fabricated parts and custom profiles from 0.7–20 mm thickness.',
    capabilityRange: '0.7 – 20 mm',
    features: [
      'High edge perpendicularity and minimal heat-affected zone (HAZ)',
      'Capable of complex geometric profiles and intricate cutouts',
      'Consistent repeatability for high-volume and batch production',
      'Direct CAD/DXF drawing conversion into CNC toolpaths'
    ],
    materialSuitability: ['Mild Steel', 'Stainless Steel', 'Aluminium']
  },
  {
    id: 'bending',
    number: '02',
    title: 'Industrial Plate Bending',
    shortTitle: 'Plate Bending',
    description: 'Controlled plate bending for fabricated components requiring accurate geometry and forming, from 3–50 mm thickness.',
    capabilityRange: '3 – 50 mm',
    features: [
      'Customer-confirmed bending capability from 3 mm to 50 mm',
      'Precision angle control and crown compensation',
      'Cylindrical shell rolling and multi-radius segment forming',
      'Heavy structural sections, channels, and reinforcement ribs'
    ],
    materialSuitability: ['IS2062 Grade Steel', 'SA516 Pressure Vessel Plates', 'Stainless Steel Alloys']
  }
];

export const WORK_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Understand',
    summary: 'Customer Drawings & Scope',
    detail: 'We begin with the customer drawing, specification, dimensions, material requirements and application details.'
  },
  {
    step: '02',
    title: 'Review',
    summary: 'Manufacturing Feasibility',
    detail: 'The requirement is reviewed from a manufacturing perspective to understand forming, cutting, fabrication and inspection needs.'
  },
  {
    step: '03',
    title: 'Manufacture',
    summary: 'Controlled Fabrication',
    detail: 'Components are produced using the appropriate fabrication processes and available manufacturing capabilities.'
  },
  {
    step: '04',
    title: 'Inspect',
    summary: 'Verification & Testing',
    detail: 'Applicable inspection and testing methods (UT, LPT, Radiography, Hydrostatic) are used according to the requirement.'
  },
  {
    step: '05',
    title: 'Deliver',
    summary: 'Dispatch & Scope Handover',
    detail: 'The completed component is prepared and packaged according to the agreed requirement and delivery scope.'
  }
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'pressure-vessels',
    title: 'Pressure Vessels',
    description: 'Fabricated vessels engineered for demanding industrial, chemical, and process applications subjected to internal pressure.',
    typicalMaterials: ['SA516 Gr. 70', 'SS304', 'IS2062'],
    examples: ['Chemical Storage Vessels', 'Jacketed Reactors', 'Receiver Vessels', 'Process Autoclaves'],
    applicableStandards: 'ASME Sec VIII / Industry Codes'
  },
  {
    id: 'storage-tanks',
    title: 'Storage Tanks',
    description: 'Industrial storage and process-related tanks fabricated to rigorous volumetric and leak-tight specifications.',
    typicalMaterials: ['Mild Steel', 'SS304 / SS316', 'IS2062 E250'],
    examples: ['28,000 L Water Sprinkler Tanks', '50 KL Mobile Sprinkler Tanks', '20 KL & 32 KL Storage Tanks', 'Cone-Bottom Silos'],
    applicableStandards: 'API 650 / IS Standards'
  },
  {
    id: 'heat-exchangers',
    title: 'Heat Exchangers',
    description: 'Custom-engineered fabricated products and shell assemblies designed for thermal transfer in process applications.',
    typicalMaterials: ['Stainless Steel', 'Carbon Steel', 'Specialty Alloy Shells'],
    examples: ['Shell and Tube Bodies', 'Channel Heads', 'Baffle Tube Bundles', 'Condenser Shells'],
    applicableStandards: 'TEMA / Process Engineering Specs'
  },
  {
    id: 'earthmoving-components',
    title: 'Earthmoving Equipment Components',
    description: 'Heavy-duty fabricated structural components engineered for extreme mechanical stress in construction and earthmoving equipment.',
    typicalMaterials: ['High-Strength Structural Steel', 'Mild Steel (Heavy Plate)', 'IS2062'],
    examples: ['Dozer Axle Housings (~3T)', 'Motor Grader Drawbars (4m, 22mm)', 'Drilling Chassis Frames', 'Track-Width Mine Ploughs'],
    applicableStandards: 'OEM Heavy Equipment Tolerances'
  },
  {
    id: 'industrial-structures',
    title: 'Industrial Structures & Components',
    description: 'Robust fabricated steel structures, equipment chassis, and specialized industrial load-bearing components.',
    typicalMaterials: ['Structural Steel Sections', 'Plates up to 50mm', 'IS2062'],
    examples: ['Heavy Base Frames', 'Cone Structures', 'Foundry Equipment Buckets', 'Lift Pallet Assemblies'],
    applicableStandards: 'Structural Engineering Codes'
  },
  {
    id: 'process-plant-components',
    title: 'Process Plant Components',
    description: 'Corrosion-resistant and high-integrity components manufactured for chemical, textile, and industrial process plants.',
    typicalMaterials: ['SS304', 'SS316', 'SA516 Carbon Steel'],
    examples: ['SS304 Process Vessels (2m dia × 9m long)', 'Trommel Screens', 'Industrial Chutes & Hoppers', 'Ducting Sections'],
    applicableStandards: 'Process Piping & Vessel Standards'
  },
  {
    id: 'sheet-metal-components',
    title: 'Sheet Metal Components',
    description: 'Custom sheet metal components manufactured with precision cutting and controlled bending to exact customer tolerances.',
    typicalMaterials: ['Mild Steel (0.7–20mm)', 'Stainless Steel', 'Aluminium'],
    examples: ['Machine Enclosures', 'Precision Brackets', 'Control Panels', 'Perforated Screens'],
    applicableStandards: 'Drawing Specific Tolerances'
  },
  {
    id: 'compression-dish-ends',
    title: 'Compression Dish Ends',
    description: 'Formed end closures manufactured using hydraulic pressing for pressure vessels, storage tanks, and process equipment.',
    typicalMaterials: ['SA516 Boiler Quality Steel', 'SS304', 'Carbon Steel'],
    examples: ['Torispherical Dish Ends', 'Ellipsoidal Heads', 'Hemispherical Formed Ends', 'Flanged & Dished Heads'],
    applicableStandards: 'Vessel Code Forming Radii'
  }
];

export const INDUSTRIES_SERVED: IndustrySector[] = [
  {
    id: 'heavy-engineering',
    name: 'Heavy Engineering',
    tagline: 'High-tonnage structural components & heavy assemblies',
    description: 'Fabricating heavy machine chassis, load-bearing housings, and large-diameter assemblies requiring controlled welding and high tonnage pressing.',
    keyComponents: ['Heavy Base Frames', 'Axle Housings', 'Press Columns', 'Crane Girder Brackets'],
    demandingFactors: ['Dynamic load resistance', 'Weld joint ultrasonic integrity', 'Dimensional parallelism']
  },
  {
    id: 'chemical-industry',
    name: 'Chemical Industry',
    tagline: 'Corrosion-resistant vessels & process containment',
    description: 'Manufacturing jacketed storage tanks, chemical reactors, and distillation vessel shells built to withstand corrosive media and thermal cycling.',
    keyComponents: ['Chemical Storage Vessels', 'SS304 Jacketed Tanks', 'Nozzle Manifolds', 'Process Scrubbers'],
    demandingFactors: ['Leak-tight joint integrity', 'Smooth surface finish', 'Hydrostatic and radiography testing']
  },
  {
    id: 'textile-industry',
    name: 'Textile Industry',
    tagline: 'Precision machinery parts & processing equipment',
    description: 'Supplying custom fabricated machine frames, roll brackets, processing tanks, and sheet metal covers for textile machinery manufacturers in the Coimbatore textile hub.',
    keyComponents: ['Dyeing Vessels', 'Textile Machine Beds', 'Roll Support Brackets', 'Tension Bars'],
    demandingFactors: ['Vibration damping', 'Smooth non-snagging seams', 'Accurate mounting hole alignment']
  },
  {
    id: 'construction-equipment',
    name: 'Construction Equipment',
    tagline: 'Rugged parts for earthmoving & infrastructure machinery',
    description: 'Building heavy-duty components for bulldozers, motor graders, excavators, and drilling rigs subjected to severe impact and torsion in the field.',
    keyComponents: ['Motor Grader Drawbars', 'Dozer Axle Housings', 'Bucket Assemblies', 'Track Components'],
    demandingFactors: ['High tensile weld strength', 'Impact toughness', 'Heavy plate forming precision']
  },
  {
    id: 'water-treatment',
    name: 'Water Treatment',
    tagline: 'High-volume tanks & filtration vessels',
    description: 'Manufacturing multi-kilolitre water sprinkler tanks, clarifier shells, sand filtration tanks, and pipeline butterfly valve bodies.',
    keyComponents: ['28,000L & 50,000L Water Sprinkler Tanks', 'Pressure Sand Filter Tanks', 'Butterfly Valve Bodies (1200mm)', 'Aeration Cones'],
    demandingFactors: ['Anti-corrosive coating', 'Full hydrostatic leak testing', 'High volumetric capacity']
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing & OEMs',
    tagline: 'Custom parts matching OEM drawings & specs',
    description: 'Contract fabrication of specialized plant equipment, material handling pallets, foundry buckets, and custom machine tooling.',
    keyComponents: ['Foundry Equipment Buckets', 'Lift Pallet Assemblies', 'Fabricated Gear Wheels', 'Machine Beds'],
    demandingFactors: ['Repeatable batch quality', 'Drawing adherence', 'Integrated machining coordination']
  },
  {
    id: 'defense',
    name: 'Defense Applications',
    tagline: 'Robust military-grade fabrication & ground equipment',
    description: 'Manufacturing specialized structural assemblies, plough attachments, and vehicle chassis parts requiring stringent material traceability and testing.',
    keyComponents: ['Track Width Mine Ploughs', 'Reinforced Defense Vehicle Mounts', 'Armored Plate Formings', 'Heavy Tow Bars'],
    demandingFactors: ['Material certification', '100% weld radiography', 'High ballistic/shock tolerance']
  },
  {
    id: 'marine',
    name: 'Marine',
    tagline: 'Heavy offshore & naval structural fabrication',
    description: 'Fabricating marine pivot structures, deck equipment foundations, and corrosion-resistant maritime assemblies engineered for harsh saline environments.',
    keyComponents: ['Marine Pivot Structures', 'Deck Winch Bases', 'Mooring Mounts', 'Sea Chest Strainers'],
    demandingFactors: ['Marine-grade plate welding', 'Salt-spray resistant blasting/painting', 'Ultrasonic joint verification']
  }
];

export const CAPABILITIES_DATA: CapabilityDetail[] = [
  {
    id: 'hydraulic-pressing',
    title: 'Hydraulic Pressing',
    capacity: 'Up to 600 tonnes',
    description: 'Heavy hydraulic pressing capacity for deep forming, dishing, and high-tonnage plate shaping.',
    specifications: ['600 Tonne Maximum Capacity', 'Multi-stroke deep draw forming', 'Compression dish end forming', 'High-strength structural plate forming'],
    highlight: 'Handles thick plate dishing and heavy forming operations'
  },
  {
    id: 'cnc-laser-cutting',
    title: 'CNC Laser Cutting',
    capacity: '0.7 – 20 mm',
    description: 'High-speed precision fiber laser cutting system producing clean edges and intricate profile geometry.',
    specifications: ['Thickness Range: 0.7 mm to 20 mm', 'Materials: Mild Steel, SS, Aluminium', 'Narrow kerf width & minimal distortion', 'Fast cycle turnaround from CAD data'],
    highlight: 'Clean burr-free cuts without secondary edge grinding'
  },
  {
    id: 'cnc-oxyfuel-cutting',
    title: 'CNC Oxyfuel Cutting',
    capacity: 'Up to 150 mm',
    description: 'Heavy plate thermal cutting for thick carbon steel slabs, heavy flanges, and large structural profiles.',
    specifications: ['Plate Thickness: Up to 150 mm', 'Heavy carbon steel and alloy plates', 'Multi-torch contour profile cutting', 'Pre-heat and controlled bevel cutting'],
    highlight: 'Cutting thick steel plates for heavy engineering'
  },
  {
    id: 'plate-bending',
    title: 'Plate Forming & Bending',
    capacity: '3 – 50 mm',
    description: 'Heavy industrial plate bending and rolling capable of tight cylindrical radii and complex multi-step bends.',
    specifications: ['Customer-Confirmed Range: 3 mm to 50 mm', 'Variable V-die and segment tooling', 'Cylindrical shell rolling capability', 'Uniform bend angles along long lengths'],
    highlight: 'Customer-confirmed capability up to 50 mm plate thickness'
  },
  {
    id: 'welding-processes',
    title: 'Welding Capabilities',
    capacity: 'FCAW, GMAW, SMAW & GTAW',
    description: 'Certified welding procedures for critical pressure boundaries and structural joints.',
    specifications: ['FCAW (Flux-Cored Arc Welding)', 'GMAW (Gas Metal Arc / MIG Welding)', 'SMAW (Shielded Metal Arc / Stick)', 'GTAW (Gas Tungsten Arc / TIG) for SS & root passes'],
    highlight: 'Multi-process welding tailored to material metallurgy'
  },
  {
    id: 'blasting-painting',
    title: 'Blasting & Painting',
    capacity: 'In-House Capability',
    description: 'Dedicated surface preparation and protective coating bay for industrial durability in harsh environments.',
    specifications: ['Grit / Shot Blasting to SA 2.5 standards', 'Epoxy, Polyurethane & Zinc Primers', 'High-build coating thickness control (DFT)', 'Specialized chemical resistance coatings'],
    highlight: 'Complete in-house finishing without outsourcing transit delay'
  },
  {
    id: 'inspection-testing',
    title: 'Inspection & Testing',
    capacity: 'UT, LPT, Radiography & Hydrostatic',
    description: 'Comprehensive non-destructive and pressure testing capabilities ensuring absolute structural compliance.',
    specifications: ['Ultrasonic Testing (UT) for internal weld soundness', 'Liquid Penetrant Testing (LPT) for surface defects', 'Radiography (RT) weld examination', 'Hydrostatic Pressure Testing with calibrated gauges'],
    highlight: 'Rigorous quality verification matched to customer specs'
  }
];

export const PROJECTS_EXPERIENCE: ProjectItem[] = [
  {
    id: 'chemical-storage-jacketed-vessel',
    title: 'Chemical Storage / Jacketed Vessel',
    category: 'Vessels & Tanks',
    material: 'SA516 Boiler Quality Steel',
    weight: 'Approximately 8 tonnes',
    dimensions: 'Custom diameter with outer heating/cooling jacket',
    description: 'Heavy-duty chemical storage and reaction vessel manufactured with an integrated jacket for temperature regulation.',
    application: 'Chemical processing plant requiring controlled heating & pressurized containment',
    keySpecs: ['SA516 Material Grade', '~8 Tonnes Fabricated Weight', 'Hydrostatic Tested', 'Precision Flange Alignment'],
    featured: true
  },
  {
    id: 'ss304-process-vessel',
    title: 'SS304 Process Vessel',
    category: 'Process Equipment',
    material: 'Stainless Steel SS304',
    dimensions: '2,000 mm diameter × 9,000 mm long',
    description: 'Large-scale horizontal process vessel engineered and fabricated for a major chemical plant installation.',
    application: 'Chemical plant process line with aggressive medium handling',
    keySpecs: ['2,000 mm Internal Diameter', '9,000 mm Shell Length', '100% Liquid Penetrant Tested', 'Sanitary Internal Weld Finish'],
    featured: true
  },
  {
    id: 'dozer-axle-housing',
    title: 'Dozer Axle Housing',
    category: 'Earthmoving & Mining',
    material: 'Mild Steel Heavy Plate',
    weight: 'Approximately 3 tonnes',
    dimensions: 'High-rigidity contoured housing',
    description: 'Heavy-duty fabricated axle housing designed to absorb extreme terrain torsion and powertrain loads in heavy bulldozers.',
    application: 'Earthmoving crawler dozer drivetrain assembly',
    keySpecs: ['~3 Tonnes Weight', 'Multi-plate welded structure', 'Strict machining allowances', 'Ultrasonic weld tested'],
    featured: true
  },
  {
    id: 'motor-grader-drawbar',
    title: 'Motor Grader Drawbar',
    category: 'Earthmoving & Mining',
    material: 'Mild Steel (22 mm plate)',
    weight: '1.5 tonnes',
    dimensions: '4,000 mm (4 m) length',
    description: 'Large high-tensile drawbar frame manufactured with 22 mm plate forming for grading blade articulation.',
    application: 'Heavy motor grader blade circle mounting mechanism',
    keySpecs: ['22 mm Heavy Steel Plate', '4 Metre Overall Length', '1.5 Tonnes Finished Weight', 'Precision Pivot Geometry'],
    featured: true
  },
  {
    id: 'water-sprinkler-tank-28kl',
    title: '28,000 L Water Sprinkler Tank',
    category: 'Vessels & Tanks',
    material: 'Mild Steel',
    weight: 'Approximately 9 tonnes',
    dimensions: '28,000 Litre Volumetric Capacity',
    description: 'Heavy-duty mobile water sprinkler tank engineered with internal anti-surge baffle plates for mining haul-road suppression.',
    application: 'Mining haul truck dust suppression & bulk water transport',
    keySpecs: ['28,000 Litre Capacity', '~9 Tonnes Empty Weight', 'Anti-surge baffle baffles', 'Full hydrostatic leak verification']
  },
  {
    id: 'water-sprinkler-tank-50kl',
    title: '50 KL Water Sprinkler Tank',
    category: 'Vessels & Tanks',
    material: 'IS2062 E250 High-Strength Steel',
    weight: 'Approximately 21 tonnes',
    dimensions: '50,000 Litre Heavy Mobile Unit',
    description: 'Massive 50 KL high-capacity sprinkler tank engineered to mount on super-heavy mining haulage trucks.',
    application: 'Open-cast mining dust control and heavy equipment service',
    keySpecs: ['50 KL (50,000 Litres) Volume', 'IS2062 E250 Steel Grade', '~21 Tonnes Fabricated Weight', 'Corrosion-resistant epoxy liner']
  },
  {
    id: 'tank-and-cone-structure-20kl',
    title: '20 KL Tank & Cone Structure',
    category: 'Vessels & Tanks',
    material: 'Mild Steel / Carbon Steel',
    dimensions: '20,000 Litre conical bottom tank',
    description: 'Conical bottom tank with integrated structural elevated support frame for gravity discharge slurry and chemical storage.',
    application: 'Process industry sedimentation & fluid discharge',
    keySpecs: ['20 KL Capacity', 'Steep Discharge Cone', 'Structural Support Legs', 'Full Circumferential Welds']
  },
  {
    id: 'storage-tank-32kl',
    title: '32 KL Industrial Storage Tank',
    category: 'Vessels & Tanks',
    material: 'Mild Steel / IS2062',
    dimensions: '32,000 Litre Capacity',
    description: 'Stationary industrial storage tank built with reinforcing rings and dished end heads for safe chemical and water reserve.',
    application: 'Industrial utility fluid and process water storage',
    keySpecs: ['32 KL Volumetric Capacity', 'Compression Dish Ends', 'Manway & Multi-Nozzle Flanges', 'Pressure leak tested']
  },
  {
    id: 'butterfly-valve-body',
    title: 'Butterfly Valve Body',
    category: 'Process Equipment',
    material: 'Fabricated & Machined Steel',
    dimensions: '1,200 mm diameter',
    description: 'Precision fabricated and finish-machined large diameter butterfly valve body engineered for high-volume pipeline control.',
    application: 'Water treatment and cooling water circulating lines',
    keySpecs: ['1,200 mm Internal Diameter', 'Precision Machined Flange Faces', 'Rigid Valve Seat Geometry', 'Hydrostatic Pressure Qualified']
  },
  {
    id: 'drilling-chassis-platform',
    title: 'Drilling Chassis / Platform',
    category: 'Industrial Machinery',
    material: 'Heavy Structural Steel',
    description: 'Rigid mobile chassis and working platform engineered for heavy rotary blast hole drilling rigs.',
    application: 'Deep well and mining exploration drill rigs',
    keySpecs: ['Heavy I-Beam & Box Sections', 'Vibration fatigue resistant', 'Integrated outrigger mounts', 'High load capacity']
  },
  {
    id: 'foundry-equipment-bucket',
    title: 'Foundry Equipment Bucket',
    category: 'Industrial Machinery',
    material: 'Heat & Abrasion Resistant Steel',
    description: 'Heavy ladle and charging bucket fabricated to withstand molten metal temperatures and mechanical impact.',
    application: 'Iron and steel foundry charging systems',
    keySpecs: ['Reinforced Rim Bands', 'Heavy Trunnion Pivot Brackets', 'Thermal Stress Relief', 'Full Penetration Welds']
  },
  {
    id: 'fabricated-gear-wheel',
    title: 'Fabricated Gear Wheel',
    category: 'Industrial Machinery',
    material: 'High-Tensile Carbon Steel',
    description: 'Large-diameter fabricated gear blank and rim structure engineered for heavy industrial drive assemblies.',
    application: 'Heavy transmission drives and industrial rotary kilns',
    keySpecs: ['Heavy Plate Webbing', 'Pre-machining weld normalization', 'Strict run-out tolerance', 'Radiography tested']
  },
  {
    id: 'lift-pallet-assembly',
    title: 'Lift Pallet Assembly',
    category: 'Industrial Machinery',
    material: 'Structural Steel',
    description: 'Robust fabricated lifting frame and pallet structure designed for high-tonnage heavy component transfer.',
    application: 'Heavy manufacturing material handling and shopfloor logistics',
    keySpecs: ['Rated High SWL (Safe Working Load)', 'Certified Lifting Lugs', 'Deflection-resistant design', 'Anti-slip surface finish']
  },
  {
    id: 'trommel-screen',
    title: 'Industrial Trommel',
    category: 'Process Equipment',
    material: 'Abrasion Resistant Plate & Mild Steel',
    description: 'Rotary cylindrical trommel screen drum fabricated for material classification and screening.',
    application: 'Mineral processing, quarrying and solid waste sorting',
    keySpecs: ['Perforated Screen Sections', 'Drive Ring Integration', 'Dynamic Balance Checking', 'Heavy Support Bearings']
  },
  {
    id: 'track-width-mine-plough',
    title: 'Track Width Mine Plough',
    category: 'Earthmoving & Mining',
    material: 'Armored & High-Yield Steel',
    description: 'Specialized front-mounted heavy plough fabricated to clear terrain and ground obstacles in defense and heavy earthmoving applications.',
    application: 'Defense engineering and harsh terrain earth clearing',
    keySpecs: ['High-Strength Tine Formings', 'Heavy Pin Articulation', 'Reinforced Blade Edges', 'Severe Shock Resistance']
  },
  {
    id: 'marine-pivot-structure',
    title: 'Marine Pivot Structure',
    category: 'Industrial Machinery',
    material: 'Marine Grade Carbon Steel / Stainless',
    description: 'Heavy structural pivot hinge and mounting housing fabricated for maritime and offshore applications.',
    application: 'Shipboard articulation systems and marine cranes',
    keySpecs: ['Corrosion Protective Coating', 'Heavy Wall Bushing Housings', 'Ultrasonic Soundness Inspection', 'Tight Machining Tolerances']
  }
];

export const WHY_CHOOSE_US = [
  {
    number: '01',
    title: 'Established Manufacturing Experience',
    description: 'More than five decades of experience since the company\'s establishment in 1978, building deep shopfloor knowledge.'
  },
  {
    number: '02',
    title: 'Custom-Engineered Approach',
    description: 'Products are developed directly around customer drawings, technical specifications, and specific application requirements.'
  },
  {
    number: '03',
    title: 'Diverse Product Experience',
    description: 'Proven track record across pressure vessels, storage tanks, equipment components, structures, and process plant equipment.'
  },
  {
    number: '04',
    title: 'Integrated Fabrication Capability',
    description: 'Cutting, forming, pressing, welding, finishing, and testing capabilities all under one single 30,000+ sq. ft. facility.'
  },
  {
    number: '05',
    title: 'Industrial Application Knowledge',
    description: 'Practical experience across heavy engineering, process industries, earthmoving equipment, water treatment, and marine.'
  },
  {
    number: '06',
    title: 'Customer-Focused Manufacturing',
    description: 'A direct engineering dialogue focused on understanding unique drawings and delivering reliable, application-specific products.'
  }
];

export const LEADERSHIP_TEAM = [
  {
    name: 'Maria Irudayaraj',
    role: 'Founder & CEO',
    bio: 'Maria Irudayaraj founded Saghai Engineering in 1978 and brings more than five decades of experience in metal fabrication. His hands-on manufacturing knowledge and long-term industry experience form an important part of the company\'s foundation.',
    experience: '50+ Years Practical Metal Fabrication'
  },
  {
    name: 'Daniel Irudayaraj',
    role: 'Director',
    bio: 'Daniel Irudayaraj joined the family business in 2023, bringing experience from Automotive Tier-1 suppliers in Detroit, Michigan, including supplier development and commodity management. His global exposure adds a strategic perspective to the company\'s continued development.',
    experience: 'Automotive Tier-1 Detroit, Michigan (Supplier Development & Commodity Management)'
  }
];

export const FAQ_LIST = [
  {
    q: 'What does Saghai Engineering manufacture?',
    a: 'Saghai Engineering manufactures custom-engineered products and fabricated components including pressure vessels, storage tanks, heat exchangers, earthmoving equipment components, industrial structures, process plant components, sheet metal components and compression dish ends.'
  },
  {
    q: 'Can you manufacture products according to customer drawings?',
    a: 'Yes. Our manufacturing approach is based entirely around customer drawings, specifications, dimensions and application requirements.'
  },
  {
    q: 'What laser cutting thickness can you handle?',
    a: 'Our current laser cutting service covers material thicknesses from 0.7 mm to 20 mm.'
  },
  {
    q: 'What plate thickness can you bend?',
    a: 'Our current customer-confirmed bending capability is from 3 mm to 50 mm.'
  },
  {
    q: 'What materials can you work with?',
    a: 'Our documented manufacturing experience includes Mild Steel, Stainless Steel, and Aluminium.'
  },
  {
    q: 'What welding processes are available?',
    a: 'FCAW, GMAW, SMAW and GTAW welding processes are available.'
  },
  {
    q: 'Do you provide inspection and testing?',
    a: 'Yes. Available testing capabilities include Ultrasonic Testing (UT), Liquid Penetrant Testing (LPT), Radiography, and Hydrostatic Testing.'
  },
  {
    q: 'What industries do you serve?',
    a: 'Our experience covers heavy engineering, chemical, textile, construction equipment, water treatment, manufacturing, defense and marine applications.'
  },
  {
    q: 'Can you handle heavy fabrication requirements?',
    a: 'Yes. Our facility includes hydraulic pressing up to 600 tonnes, heavy fabrication, cutting, forming, welding and inspection capabilities for demanding industrial requirements.'
  },
  {
    q: 'How can I request a quotation?',
    a: 'Share your drawing, specification, material requirement, quantity and application details through our enquiry form. Our engineering team can review the requirement and discuss the next steps.'
  }
];
