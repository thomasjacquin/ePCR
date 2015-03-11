angular.module('ePCR.constants', [])

.constant('chiefComplaint', {
  primary: [
        "Other",
        "Abdominal Pain",
        "Angina",
        "Angina (Unstable)",
        "Angina (Stable)",
        "Alcohol With-drawl",
        "Allergic Reaction",
        "Altered mental Status",
        "Anaphylaxis",
        "Bradycardia",
        "Burn",
        "Cardiac Arrest",
        "Cerebrovascular Accident (CVA)",
        "Chest Pain (Cardiac)",
        "Chest Pain (Non-Cardiac)",
        "Chest Pain Not Yet Diagnosed",
        "Child Delivery",
        "Croup",
        "Death",
        "Dehydration",
        "Ectopic Pregnancy",
        "Epidural Bleed",
        "Epiglottitis",
        "Food Poisoning",
        "Hypertensive Crisis",
        "Hypertensive Emergency",
        "Hyperthermia",
        "Hypoglycemia",
        "Hypotension",
        "Hypothermia",
        "Labor",
        "Major Trauma",
        "Musculoskeletal Trauma",
        "Nausea",
        "Near Drowning",
        "Obstructed Airway",
        "Overdose",
        "Palpitations",
        "Pelvic Pain",
        "Poisoning",
        "Pregnancy Complications",
        "Psychiatric Emergency",
        "Rape",
        "Respiratory Arrest",
        "Seizure",
        "Sexual Abuse",
        "Shock",
        "Sickle Cell Crisis",
        "SIDS",
        "Smoke Inhalation",
        "Spinal Cord Injury",
        "Subdural Bleed",
        "Syncope",
        "Tachycardia",
        "Transient Ischemic Attacks (TIA)",
        "Unconscious/Unknown",
        "Vaginal Bleeding",
        "Vomiting"
              ],
  pertinent: [
        "Difficulty Breathing",
        "Chest Pain",
        "Nausea",
        "Vomiting",
        "Diarrhea",
        "Dizziness",
        "Headache",
        "Loss of Consciousness",
        "Numbness Tingling",
        "General Weakness",
        "Lethargy",
        "Neck Pain",
      ]
})

.constant('allergies', {
  list: [
        "Anticonvulsants",
        "Aspirin",
        "Ibuprofen",
        "Iodine",
        "Insulin",
        "IV contrast dye",
        "Lidocaine",
        "Naproxen",
        "Novocaine",
        "Penicillin",
        "Sulfa drugs",
        "NKDA",
        "NKDA per staff",
        "NKDA per parent/guardian"
      ]
})

.constant('homeMedications', {
  generic: {
    name: "Generic",
    list: [
        "Acetamin. w codeine",
        "Acetaminophen",
        "Adenosine",
        "Adrenalin",
        "Amiodarone",
        "Anexate",
        "ASA",
        "Atropine Sulfate",
        "Benztropine",
        "Betamethasone",
        "Betaxin",
        "Budesonide",
        "Calcium Chloride",
        "Calcium Gluconate",
        "Dexamethasone",
        "Dextrose",
        "Diazepam",
        "Dimenhydrinate",
        "Diphenhydramine",
        "Furosemide",
        "Glucagon",
        "Haloperidol",
        "Heparin, Carboprost Tromethamine",
        "Hydrocort",
        "Indocid",
        "Intropin",
        "Ipatroprium Br.",
        "Isoptine, Calan",
        "Ketalar",
        "Keterolac",
        "Levophed",
        "Lorazepam",
        "Meperidine",
        "Metoclopramide, Reglan",
        "Metoprolol",
        "MgSO4",
        "Midazolam",
        "Morphine Sulfate",
        "NaHCO3",
        "Naloxone",
        "Nitroglycerine, GTN, NTG",
        "Nitrous Oxide",
        "Olanzepine",
        "Osmitrol",
        "Oxygene",
        "Pantoprazole",
        "Phenytoin",
        "Phytonadione",
        "Pressyn",
        "Prostaglandin",
        "Ranitidine",
        "Retevase",
        "Salbutemol",
        "Sublimaze",
        "Suxamethonium Cl",
        "Syntocinon",
        "Trandate",
        "Xylocard,Xylocaine",
        "Zemuron"
      ]
  },
  brand: {
    name: "Brand",
    list: [
      "Adenocard",
      "Aspirin",
      "Ativan",
      "Atropine",
      "Atrovent",
      "Benadryl",
      "Betaject",
      "Calciject, CaCl",
      "Calcium Gluconate",
      "Codarone",
      "Cogentin",
      "D50W",
      "Decadron",
      "Demerol",
      "Dilantin",
      "Dopamine",
      "Entonox",
      "Epinephrine",
      "Fentanyl",
      "Flumazenil",
      "Glucagon",
      "Gravol",
      "Haldol",
      "Hemabate",
      "Heparin",
      "Hydrocortisone",
      "Indomethacin PR",
      "Ketamine",
      "Labetalol",
      "Lasix",
      "Lidocaine",
      "Magnesium Sulfate",
      "Mannitol",
      "Maxeran",
      "Metolprolol",
      "Morphine",
      "Narcan",
      "Nitroglycerine, GTN, NTG",
      "Norepinephrine",
      "Oxygene",
      "Oxytocin",
      "Pantoloc",
      "Pulmicort",
      "Reteplase",
      "Rocuronium",
      "Sodium Bicarbonate",
      "Succinycholine",
      "Thiamine",
      "Toradol",
      "Tylenol",
      "Tylenol",
      "Valium",
      "Vasopressin",
      "Ventolin",
      "Verapamil",
      "Versed",
      "Vitamin K",
      "Zantac",
      "Zyprexa"
    ]
  }
})

.constant('medicalConditions', {
  csv: {
    name: "Cardiovascular",
    list: [
      "A-Fib",
      "A-Flutter",
      "Acute Coronary Syndrome (ACS)",
      "Acute Myocardial Infarction (AMI)",
      "Angina ",
      "Angina (Unstable)",
      "Aortic Dissection",
      "Aortic Stenosis",
      "Ascites",
      "Atherosclerosis",
      "Atrial Tach",
      "Cardiac Arrhythmia",
      "Cardiomegaly (enlarged heart)",
      "Congenital heart disease",
      "Congestive Heart Failure (CHF)",
      "Coronary Artery Disease (CAD)",
      "Deep Vein Thrombosis",
      "Dyslipidemia",
      "Endocarditis",
      "Heart Failure (Left)",
      "Heart Failure (Right)",
      "Heart Murmur",
      "Hyperlipidemia",
      "Hypertension (HTN)",
      "Left Ventricular Hypertrophy (LVH)",
      "Mitral Valve Prolapse",
      "Myocarditis",
      "Pacemaker (AV)",
      "Pacemaker (Ventricular)",
      "Pacemaker (Wandering Atrial)",
      "Palpitations",
      "Parox Suprav Tachy (PSVT)",
      "Pericardial Effusion",
      "Pericardial Tamponade",
      "Pericarditis",
      "Peripheral Vascular Disease",
      "PVCs",
      "Rheumatic Heart Disease",
      "V-Tach",
      "Valvular heart disease"
    ]
  },
  resp: {
    name: "Respiratory",
    list: [
      "Asthma",
      "Bronchitis",
      "Chron Obstr Pulmon Dis (COPD)",
      "Chronic Cough",
      "Cold",
      "Croup",
      "Cystic Fibrosis",
      "Emphysema",
      "H1N1",
      "Hantavirus",
      "Influenza/Flu",
      "Lung Cancer",
      "Pleurisy",
      "Pneumonia",
      "Pneumothorax",
      "Pulmonary Embolus",
      "Pulmonary Fibrosis",
      "Respir Distress Syndrome (RDS)",
      "Respiratory Syncytial Virus (RSV)",
      "Sarcoidosis",
      "Sleep Apnea",
      "Sudden Infant Death Syn (SIDS)",
      "Swine Flu",
      "Tobacco Use (Current)",
      "Tobacco Use (Hx)",
      "Tuberculosis (TB)"
    ]
  },
  gu_gi: {
    name: "GU/GI",
    list: [
      "Abdominal Adhesions",
      "Acid Reflux",
      "Appendectomy",
      "Appendicitis",
      "Autosom Dom Polycys Kidney Dis",
      "Bacterial Vaginosis",
      "Barrett's Esophagus",
      "Benign Prost Hypertrophy/plasia",
      "Bladder Infection",
      "Bowel Incontinence",
      "Celiac Disease",
      "Chancroid",
      "Chlamydia",
      "Cholecystect (Gallbladder Rem)",
      "Chronic Kidney Disease",
      "Cirrhosis",
      "Colon Polyps",
      "Constipation",
      "Crohn's Disease",
      "Cystic Kidney Disease",
      "Cystitis",
      "Diarrhea",
      "Diverticulosis / Diverticulitis",
      "Duodenal Ulcer",
      "Ectopic Kidney",
      "Emodialysis",
      "End Stage Renal Disease",
      "Erectile Dysfunction (ED)",
      "Fallen Bladder",
      "Food Poisoning",
      "Gallstones",
      "Gastritis",
      "Gastroesoph Refl Dis (GERD)",
      "Genital Herpes",
      "Genital Warts",
      "Gonorrhoea",
      "Goodpasture's Syndrome",
      "Heartburn",
      "Hematuria / Blood in Urine",
      "Hemorrhoids",
      "Hepatitis A",
      "Hepatitis B",
      "Hepatitis C",
      "Hernia",
      "Hiatal Hernia",
      "Hypertension",
      "Ileostomy / Colostomy",
      "Inflammatory Bowel Disease",
      "Inguinal Hernia",
      "Irritable Bowel Syndrome",
      "Lactose Intolerance",
      "Nephrotic Syndrome",
      "Painful Bladder Syndrome",
      "Pancreatitis",
      "Pelvic Inflammatory Disease (PID)",
      "Polycystic Kidney Disease (PKD)",
      "Proctitis",
      "Prostate Cancer",
      "Proteinuria",
      "Pubic Lice (Crabs)",
      "Pyelonephritis (Ren/Kidn Inf)",
      "Renal / Kidney Cysts",
      "Renal / Kidney Failure",
      "Renal / Kidney Stones",
      "Renal / Kidney Transplant",
      "Renal Artery Stenosis (RAS)",
      "Renal Dysplasia",
      "Renal Tubular Acidosis (RTA)",
      "Scabies",
      "Stomach Flu",
      "Stomach Ulcers",
      "Syphillis",
      "Thrush (Candiada)",
      "Trichomoniasis",
      "Ulcer",
      "Urethritis",
      "Urinary Incontinence",
      "Urinary Retention",
      "Urinary Tract Infection (UTI)",
      "Whipple's Disease",
      "Wilson's Disease"
    ]
  },
  neuro: {
    name: "Neuro",
    list: [
      "Acute Dissem encephalomy",
      "Agnosia",
      "Alternating hemiplegia",
      "Alzheimer's disease",
      "Anoxia",
      "Aphasia",
      "Apraxia",
      "Arachnoid cysts",
      "Arachnoiditis",
      "Arteriovenous malformation",
      "Atten Deficit Hyperactiv Dis",
      "Auditory processing disorder",
      "Autonomic Dysfunction",
      "Back Pain",
      "Bell's palsy",
      "Benign Intracranial Hypertension",
      "Brachial plexus injury",
      "Brain abscess",
      "Brain damage",
      "Brain injury",
      "Brain tumor",
      "Brown-Sequard syndrome",
      "Carpal tunnel syndrome",
      "Central pain syndrome",
      "Central pontine myelinolysis",
      "Centronuclear myopathy",
      "Cephalic disorder",
      "Cerebral aneurysm",
      "Cerebral arteriosclerosis",
      "Cerebral atrophy",
      "Cerebral gigantism",
      "Cerebral palsy",
      "Cerebral vasculitis",
      "Cervical spinal stenosis",
      "Chorea",
      "Chronic fatigue syndrome",
      "Chron inflam demy polyneuro",
      "Chronic pain",
      "Coma",
      "Compression neuropathy",
      "Corticobasal degeneration",
      "Cranial arteritis",
      "Creutzfeldt-Jakob disease",
      "Cushing's syndrome",
      "Dementia",
      "Dermatomyositis",
      "Developmental dyspraxia",
      "Diabetic neuropathy",
      "Diffuse sclerosis",
      "Dyslexia",
      "Dystonia",
      "Encephalitis",
      "Epilepsy",
      "Erythromelalgia",
      "Essential tremor",
      "Fainting",
      "Febrile seizures",
      "Fibromyalgia",
      "Gray matter heterotopia",
      "Head injury",
      "Headache",
      "Herpes zoster oticus",
      "Herpes zoster",
      "Huntington's disease",
      "Hydranencephaly",
      "Hydrocephalus",
      "Hypoxia",
      "Immune-Mediated encephalomye",
      "Infantile spasms",
      "Inflammatory myopathy",
      "Intracranial cyst",
      "Intracranial hypertension",
      "Learning disabilities",
      "Locked-In syndrome",
      "Lou Gehrig's dis (Motor Neur Dis)",
      "Lumbar disc disease",
      "Lumbar spinal stenosis",
      "Lyme dis-Neurological Sequelae",
      "Menieres disease",
      "Meningitis",
      "Menkes disease",
      "Microcephaly",
      "Micropsia",
      "Migraine",
      "Mini-stroke (trans isch att)",
      "Mitochondrial myopathy",
      "Mobius syndrome",
      "Monomelic amyotrophy",
      "Motor Neurone Disease",
      "Motor skills disorder",
      "Multi-infarct dementia",
      "Multifocal motor neuropathy",
      "Multiple sclerosis",
      "Multiple system atrophy",
      "Muscular dystrophy",
      "Myasthenia gravis",
      "Myelinoclastic diffuse sclerosis",
      "Myoclonic Encephalopathy",
      "Myoclonus",
      "Myopathy",
      "Narcolepsy",
      "Neuroleptic malignant syndrome",
      "Neuromyotonia",
      "Nonverbal learning disorder",
      "Occipital Neuralgia",
      "Optic neuritis",
      "Orthostatic Hypotension",
      "Palinopsia",
      "Paresthesia",
      "Parkinson's disease",
      "Peripheral neuropathy",
      "Persistent Vegetative State",
      "Pervasive developmental disorders",
      "Photic sneeze reflex",
      "Pinched nerve",
      "Pituitary tumors",
      "PMG",
      "Polio",
      "Polymicrogyria",
      "Polymyositis",
      "Porencephaly",
      "Post-Polio syndrome",
      "Postherpetic Neuralgia (PHN)",
      "Postinfectious Encephalomyelitis",
      "Postural Hypotension",
      "Primary Lateral Sclerosis",
      "Rabies",
      "Reflex neurovascular dystrophy",
      "Repetitive motion disorders",
      "Repetitive stress injury",
      "Restless legs syndrome",
      "Rhythmic Movement Disorder",
      "Sandhoff disease",
      "Schizophrenia",
      "Septo-optic dysplasia",
      "Shaken baby syndrome",
      "Shingles",
      "Sleep apnea",
      "Sleeping sickness",
      "Spina bifida",
      "Spinal cord injury",
      "Spinal cord tumors",
      "Spinal muscular atrophy",
      "Spinocerebellar ataxia",
      "Stroke",
      "Syncope",
      "Synesthesia",
      "Tarsal tunnel syndrome",
      "Temporal arteritis",
      "Tetanus",
      "Tourette syndrome",
      "Toxic encephalopathy",
      "Transient ischemic attack",
      "Transverse myelitis",
      "Traumatic brain injury",
      "Tremor",
      "Whiplash",
      "Wilson's disease"
    ]
  },
  endocrine: {
    name: "Endocrine",
    list: [
      "Acromegaly / Gigantism",
      "Addison's disease",
      "Adrenal insufficiency",
      "Adrenocortical carcinoma",
      "Amenorrhea",
      "Androgen insensitivity syndromes",
      "Carcinoid syndrome",
      "Conn's syndrome",
      "Cushing's disease",
      "Cushing's syndrome",
      "Delayed puberty",
      "Diabetes insipidus",
      "Diabetes",
      "Gender identity disorder",
      "Gestational Diabetes",
      "Glucagonoma",
      "Goitre",
      "Gonadal dysgenesis",
      "Graves-Basedow disease",
      "Hashimoto's thyroiditis",
      "Hermaphroditism",
      "Hyperthyroidism",
      "Hypoglycemia",
      "Hypogonadism (Gonadotropin def)",
      "Hypoparathyroidism",
      "Hypopituitarism",
      "Hypothyroidism",
      "Mature Onset Diab of Y (MODY)",
      "Mineralocorticoid deficiency",
      "Multiple endocrine neoplasia",
      "Osteitis deform (Paget bone Dis)",
      "Osteoporosis",
      "Ovarian failure (Premature Menop)",
      "Pituitary adenomas",
      "Pituitary tumors",
      "Polycystic ovary syndrome",
      "Precocious puberty",
      "Primary hyperparathyroidism",
      "Prolactinoma",
      "Pseudohypoparathyroidism",
      "Rickets and osteomalacia",
      "Secondary hyperparathyroidism",
      "Tertiary hyperparathyroidism",
      "Testicular failure",
      "Thyroid cancer",
      "Thyroidectomy",
      "Thyroiditis",
      "Toxic multinodular goitre",
      "Type 1 Diabetes mellitus",
      "Type 2 Diabetes mellitus"
    ]
  },
  psych: {
    name: "Psychological",
    list: [
      "Acute stress disorder",
      "Adjustment disorder",
      "Amnesia",
      "Anorexia nervosa",
      "Antisocial personality disorder",
      "Anxiety disorder",
      "Asperger syndrome",
      "Attention deficit disorder",
      "Autism",
      "Autophagia",
      "Avoidant personality disorder",
      "Bereavement",
      "Binge eating disorder",
      "Bipolar disorder",
      "Borderline personality disorder",
      "Bulimia nervosa",
      "Cyclothymia",
      "Delirium",
      "Delusional disorder",
      "Dementia",
      "Dependent personality disorder",
      "Depression",
      "Dissociative identity disorder",
      "Down syndrome",
      "Dyslexia",
      "Dyspraxia",
      "Exhibitionism",
      "Gender identity disorder",
      "Generalized anxiety disorder",
      "Hyperactivity disorder",
      "Hyperkinetic syndrome",
      "Hypochondriasis",
      "Hysteria",
      "Kleptomania",
      "Mania",
      "Munchausen syndrome",
      "Narcissistic personality disorder",
      "Narcolepsy",
      "Nightmares",
      "Obsessive-compuls perso dis",
      "Obsessive-compulsive disorder",
      "Pain disorder",
      "Panic attacks",
      "Paranoid personality disorder",
      "Parasomnia",
      "Pathological gambling",
      "Perfectionism",
      "Pervasive developmental disorder",
      "Post-traumatic stress disorder",
      "Postpartum Depression",
      "Primary hypersomnia",
      "Primary insomnia",
      "Psychotic disorder",
      "Pyromania",
      "Rumination syndrome",
      "Sadism and masochism",
      "Schizoid",
      "Schizophrenia",
      "Seasonal affective disorder",
      "Self Injury",
      "Separation anxiety disorder",
      "Sleep disorder",
      "Sleep terror disorder",
      "Sleepwalking disorder",
      "Social anxiety disorder",
      "Stuttering",
      "Suicide",
      "Tourette syndrome"
    ]
  }
})

.constant('bodyParts', {
  list: [
      "Head",
      "Neck",
      "Chest",
      "Abdomen",
      "Pelvis",
      "Left arm",
      "Right arm",
      "Left leg",
      "Right leg",
      "Back"
    ]
})

.constant('muscularInjuries', {
  list: [
        "Deformities",
        "Contusion",
        "Abrasion",
        "Puncture",
        "Penetration",
        "Burn",
        "Tenderness",
        "Laceration",
        "Swelling",
        "Crepitus",
        "Step-off"
      ]
})

.constant('ppe', {
  list: [
        "Gloves",
        "Eye protection",
        "Reflective gear",
        "Isolation gear",
        "Mask"
      ]
})

.constant('exportTableDefinition', {
  vitals: {
    created: {
      name: "Date"
    },
    hr: {
      name: "Heart Rate"
    },
    sys: {
      name: "Systole"
    },
    dia: {
      name: "Diastole"
    },
    fio2: {
      name: "FiO2"
    },
    spo2: {
      name: "SpO2"
    },
    resp: {
      name: "Resp"
    },
    level_of_c: {
      name: "L.O.C."
    },
    left_eye: {
      name: "Left Eye (mm)"
    },
    right_eye: {
      name: "Right Eye (mm)"
    },
    bgl: {
      name: "BGL",
      unit: 'bgl_unit'
    },
    temp: {
      name: "Temp",
      unit: 'temp_unit'
    },
    etco2: {
      name: "etCO2",
      unit: 'etco2_unit'
    },
    pain: {
      name: "Pain"
    }
  },
  neuro: {
        created: {
      name: "Date"
    },
    avpu: {
      name: "AVPU"
    },
    gcs: {
      name: "GCS"
    },
    luxr: {
      name: "Left arm Reflex"
    },
    ruxr: {
      name: "Right arm Reflex"
    },
    llrx: {
      name: "Left leg Reflex"
    },
    rlxr: {
      name: "Right leg Reflex"
    },
    suspect_stroke: {
      name: "Suspect Stroke"
    },
    facial_droop: {
      name: "Facial Droop",
      side: "facial_droop_side"
    },
    arm_drift: {
      name: "Arm Drift",
      side: "arm_drift_side"
    },
    speech: {
      name: "Speech"
    }
  },
  airway_basic: {
        created: {
      name: "Date"
    },
    oxygen_volume: {
      name: "Volume"
    },
    basic_maneuvers: {
      name: "Maneuver"
    },
    opa: {
      name: "OPA"
    },
    npa: {
      name: "NPA"
    },
    bvm: {
      name: "BVM"
    },
    airway_rate: {
      name: "Rate"
    }
  },
  airway_ventilator: {
    created: {
      name: "Date"
    },
    control: {
      name: "Control"
    },
    mode: {
      name: "Mode"
    },
    rate: {
      name: "Rate"
    },
    tidal_volume: {
      name: "Tidal V."
    },
    inspiration_time: {
      name: "Insp. Time"
    },
    inspiration_ratio: {
      name: "Insp. ratio"
    },
    expiration_ratio: {
      name: "Exp. ratio"
    },
    fio2: {
      name: "FiO2"
    },
    peep: {
      name: "Peep"
    },
    sensitivity: {
      name: "Sensitivity"
    },
    expiration_pressure: {
      name: "Exp. P"
    },
    expiration_tidal_volume: {
      name: "Exp. Tidal P"
    },
    max_inspiration_pressure: {
      name: "Max Insp. P"
    },
    plateau_pressure: {
      name: "Plateau P"
    },
    pressure_support: {
      name: "P Support"
    },
    high_pressure_limit: {
      name: "High P lim"
    },
    low_pressure_limit: {
      name: "Low P lim"
    },
    low_min_volume: {
      name: "Low min V"
    }
  },
    airway_cpap_bipap: {
    created: {
      name: "Date"
    },
    device: {
      name: "Device"
    },
    size: {
      name: "Size"
    },
    fio2: {
      name: "FiO2"
    },
    peep: {
      name: "PEEP"
    },
    pressure: {
      name: "Pressure"
    }
  },
  airway_suction: {
    created: {
      name: "Date"
    },
    duration: {
      name: "Duration"
    },
    amount: {
      name: "Amount"
    },
    tip: {
      name: "Tip"
    },
    size: {
      name: "Size"
    }
  },
  iv_io: {
    created: {
      name: "Date"
    },
    site: {
      name: "Site"
    },
    side: {
      name: "Side"
    },
    gauge: {
      name: "Gauge"
    },
    successful: {
      name: "Success"
    },
    fluid: {
      name: "Fluid",
      other: "fluid_other"
    }
  },
  splinting: {
    created: {
      name: "Date"
    },
    location: {
      name: "Location"
    },
    side: {
      name: "Side"
    },
    sensation_prior: {
      name: "Sensation Prior"
    },
    sensation_post: {
      name: "Sensation Post"
    },
    traction_applied: {
      name: "Traction"
    },
    splinting_type: {
      name: "Type",
      other: "splinting_type_other"
    },
    position_found: {
      name: "Position Found",
      other: "position_found_other"
    }
  },
  medication: {
    created: {
      name: "Date"
    },
    medication_type: {
      name: "Type"
    },
    medication: {
      name: "Medication",
      other: "medication_other"
    },
    dose: {
      name: "Dose",
      unit: "dose_unit"
    },
    route: {
      name: "Route",
      other: "route_other"
    },
    indication: {
      name: "Indication"
    },
    administrated: {
      name: "Administrated",
      other: "administrated_other"
    },
    same_dose: {
      name: "Same dose"
    },
  },
in_out: {
    created: {
      name: "Date"
    },
    direction: {
      name: "Direction"
    },
    volume: {
      name: "Volume"
    },
    substance: {
      name: "Substance",
      other: "substance_other"
    }
  },
  ecg: {
    created: {
      name: "Date"
    },
    leads_nb: {
      name: "Leads"
    },
    rhythm: {
      name: "Rhythm"
    },
    regular: {
      name: "Regular"
    },
    bbb: {
      name: "BBB",
    },
    bbb_side: {
      name: "BBB Side",
    },
    st_elevation_list: {
      name: "Elevation",
    },
    st_depression_list: {
      name: "Depression",
    },
    pacs: {
      name: "PACS",
    },
    PVCS: {
      name: "PVCS",
    }
  },
  narrative: {
    created: {
      name: "Date"
    },
    narration: {
      name: "Narrative"
    }
  },
  code: {
    time: {
      name: "Time"
    },
    code: {
      name: "Code"
    }
  }
})

.constant('body_parts_area', {
  rule_of_9: {
    head_front: {
      adult: 4.5,
      obese: 1,
      child: 9,
      infant: 9.5,
    },
    head_back: {
      adult: 4.5,
      obese: 1,
      child: 9,
      infant: 9.5,
    },
    chest: {
      adult: 9,
      obese: 12,
      child: 9,
      infant: 8,
    },
    abdomen: {
      adult: 9,
      obese: 12,
      child: 9,
      infant: 8,
    },
    upper_back: {
      adult: 9,
      obese: 12,
      child: 9,
      infant: 8,
    },
    lower_back: {
      adult: 9,
      obese: 12,
      child: 9,
      infant: 8,
    },
    groin: {
      adult: 1,
      obese: 0,
      child: 1,
      infant: 1,
    },
    left_arm_front: {
      adult: 4.5,
      obese: 2.5,
      child: 4.5,
      infant: 4,
    },
    left_arm_back: {
      adult: 4.5,
      obese: 2.5,
      child: 4.5,
      infant: 4,
    },
    right_arm_front: {
      adult: 4.5,
      obese: 2.5,
      child: 4.5,
      infant: 4,
    },
    right_arm_back: {
      adult: 4.5,
      obese: 2.5,
      child: 4.5,
      infant: 4,
    },
    left_leg_front: {
      adult: 9,
      obese: 10,
      child: 6.75,
      infant: 8,
    },
    left_leg_back: {
      adult: 9,
      obese: 10,
      child: 6.75,
      infant: 8,
    },
    right_leg_front: {
      adult: 9,
      obese: 10,
      child: 6.75,
      infant: 8,
    },
    right_leg_back: {
      adult: 9,
      obese: 10,
      child: 6.75,
      infant: 8,
    }
  },
  lund_browder: {
    head_front: headSurface,
    head_back: headSurface,
    neck_front: 1,
    neck_back: 1,
    chest: 13,
    back: 13,
    left_buttock: 2.5,
    right_buttock: 2.5,
    groin: 1,
    left_arm_front: 2,
    left_arm_back: 2,
    left_forearm_front: 1.5,
    left_forearm_back: 1.5,
    left_hand_front: 1.5,
    left_hand_back: 1.5,
    right_arm_front: 2,
    right_arm_back: 2,
    right_forearm_front: 1.5,
    right_forearm_back: 1.5,
    right_hand_front: 1.5,
    right_hand_back: 1.5,
    left_upper_leg_front: upperLegSurface,
    left_upper_leg_back: upperLegSurface,
    left_lower_leg_front: lowerLegSurface,
    left_lower_leg_back: lowerLegSurface,
    left_foot_front: 1.75,
    left_foot_back: 1.75,
    right_upper_leg_front: upperLegSurface,
    right_upper_leg_back: upperLegSurface,
    right_lower_leg_front: lowerLegSurface,
    right_lower_leg_back: lowerLegSurface,
    right_foot_front: 1.75,
    right_foot_back: 1.75
  }
})

.constant('body_parts_names', {
  head_front: "Face",
  head_back: "Head back",
  chest: "Chest",
  abdomen: "Abdomen",
  upper_back: "Upper back",
  lower_back: "Lower back",
  groin: "Groin",
  left_arm_front: "Left arm front",
  left_arm_back: "Left arm back",
  right_arm_front: "Right arm front",
  right_arm_back: "Right arm back",
  left_leg_front: "Left leg front",
  left_leg_back: "Left leg back",
  right_leg_front: "Right leg Front",
  right_leg_back: "Right leg back",
  neck_front: "Throat",
  neck_back: "Nape",
  back: "Back",
  left_buttock: "Left buttock",
  right_buttock: "Right buttock",
  groin: "Groin",
  left_forearm_front: "Left forearm front",
  left_forearm_back: "Left forearm back",
  left_hand_front: "Left hand front",
  left_hand_back: "Left hand back",
  right_forearm_front: "Right forearm front",
  right_forearm_back: "Right forearm back",
  right_hand_front: "Right palm",
  right_hand_back: "Right hand back",
  left_upper_leg_front: "Left thigh front",
  left_upper_leg_back: "Left thigh back",
  left_lower_leg_front: "Left lower leg front",
  left_lower_leg_back: "Left calf",
  left_foot_front: "Left foot front",
  left_foot_back: "Left foot back",
  right_upper_leg_front: "Right thigh front",
  right_upper_leg_back: "Right thigh back",
  right_lower_leg_front: "Right lower leg front",
  right_lower_leg_back: "Right calf",
  right_foot_front: "Right foot front",
  right_foot_back: "Right foot back"
})

.constant('burnDegrees', {
  First: "Superficial Erythema",
  Second: "PTL",
  Third: "FTL"
})
  
.constant('seatsMap', {
    car1: {
      name: "Driver"
    },
    car2: {
      name: "Front Right"
    },
    car3: {
      name: "Middle Left"
    },
    car4: {
      name: "Middle Right"
    },
    car5: {
      name: "Rear Left"
    },
    car6: {
      name: "Rear Right"
    },
    truck1: {
      name: "Driver"
    },
    truck2: {
      name: "Front center"
    },
    truck3: {
      name: "Front Right"
    },
    motorcycle1: {
      name: "Driver"
    },
    motorcycle2: {
      name: "Passenger"
    },
    motorcycle3: {
      name: "Side Passenger"
    }
});