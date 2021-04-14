from app.models import db, Profile


def seed_profiles():
    boston_fern = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/Boston_Fern_(Nephrolepis_exaltata)_1.jpg',
        common_names=['Boston Fern', 'Sword Fern',
                      'Fishbone Fern', 'Tuber Ladder Fern'],
        genus_species='Nephrolepis exaltata',
        family='Nephrolepidaceae',
        native_range='Humid swamps, especially  in northern South America, Mexico, Central America, Florida, the West Indies, Polynesia, and Africa',
        temp_range='50-80',
        light='Bright Indirect',
        soil_type='Well-draining and compost rich',
        water_when='Water when top of soil feels slightly dry to the touch.',
        fertilization='Use a well-balanced fertilizer a few times a year.',
        pests=['spider mites', 'mealybugs'],
        propogation_methods=['root division', 'off-shoots'],
        toxic_to_pets=False
    )
    tradescantia = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/tradescantia.jpg',
        common_names=['Inch Plant',
                      'Spiderwort'],
        genus_species='Tradescantia zebrina',
        family='Commelinaceae',
        native_range='Wetland and rainforest, river banks at lower altitudes. Native to Mexico, Central America, Columbia, and the Caribbean islands.',
        temp_range='50-86',
        light='Bright Indirect',
        soil_type='Well-draining and compost rich',
        water_when='Water when the top inch of soil is dry.',
        fertilization='Use a well-balanced fertilizer at 1/2-strength monthly during the growing season.',
        pests=['spider mites', 'mealybugs',
               'aphids', 'whitefly', 'scale', 'thrips'],
        propogation_methods=['stem cuttings', 'seed'],
        toxic_to_pets=True
    )
    hypoestes = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/Acanthaceae-Hypoestes-phyllostachya-Mixed-Splash-1-Steve%E2%80%99s-Leaves-Inc.-1.jpg',
        common_names=['Polka Dot Plant'],
        genus_species='Hypoestes phyllostachya',
        family='Acanthaceae',
        native_range='South Africa, Madagascar, and Southeast Asia',
        temp_range='65-80',
        light='Bright Indirect',
        soil_type='Well-draining and compost rich',
        water_when='Water when the top inch of soil is dry.',
        fertilization='Use a well-balanced organic fertilizer monthly during the growing season.',
        pests=['scale', 'whiteflies', 'mealy bugs', 'aphids'],
        propogation_methods=['stem cuttings', 'seed'],
        toxic_to_pets=True
    )
    chlorophytum = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/Chlorophytum_comosum_Ampel.jpg',
        common_names=['Spider Plant', 'Airplane Plant',
                      "St. Bernard's Lily", 'Ribbon Plant', 'Hens and Chicks'],
        genus_species='Chlorophytum comosum',
        family='Anthericaceae',
        native_range='Tropical and Southern regions of Africa',
        temp_range='50-80',
        light='Bright Indirect',
        soil_type='Standard potting mix',
        water_when='Water when the top inch or two of soil is dry.',
        fertilization='Use a well-balanced fertilizer bi-weekly to monthly during the growing season.',
        pests=['spider mites', 'whiteflies', 'mealybugs', 'aphids'],
        propogation_methods=['plantlets', 'seed'],
        toxic_to_pets=False
    )
    polly = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/alocasia-polly.jpg',
        common_names=['Alocasia Polly'],
        genus_species='Alocasia x amazonica',
        family='Araceae',
        native_range='Asian tropics',
        temp_range='65-80',
        light='Bright Indirect',
        soil_type='Well-draining and light',
        water_when='Water when the top 1/2" of soil is dry.',
        fertilization='Use a well-balanced fertilizer bi-weekly to monthly during the growing season.',
        pests=['spider mites', 'thrips', 'scale', 'aphids', 'mealybugs'],
        propogation_methods=['root division'],
        toxic_to_pets=True
    )
    anthurium = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/1280px-AnthuriumAndraenum.jpg',
        common_names=['Flamingo Lily', 'Tailflower',
                      "Painter's Palette", 'Laceleaf', 'Painted Tongue Plant'],
        genus_species='Anthurium andraeanum',
        family='Araceae',
        native_range='Columbia and Ecuador',
        temp_range='60-90',
        light='Bright Indirect',
        soil_type='Well-draining and rich',
        water_when='Water when the top inch of soil is dry.',
        fertilization='Use a fertilizer with a higher phosphorus number every three to four months.',
        pests=['spider mites', 'thrips', 'scale', 'aphids', 'mealybugs'],
        propogation_methods=['root division', 'off-shoots'],
        toxic_to_pets=True
    )
    dieffenbachia = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/dieffenbachia-seguine.jpg',
        common_names=['Dumb Cane', 'Leopard Lily'],
        genus_species='Dieffenbachia seguine',
        family='Araceae',
        native_range='The New World Tropics from Mexico and the West Indies to Argentina',
        temp_range='60-85',
        light='Bright Indirect',
        soil_type='Well-draining and rich',
        water_when='Water when the top inch of soil is dry.',
        fertilization='Use a well-balanced fertilizer at half strength every two-four weeks during the growing season.',
        pests=['spider mites', 'aphids', 'mealybugs', 'scale'],
        propogation_methods=['root division', 'off-shoots'],
        toxic_to_pets=True
    )
    pothos = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/Epipremnum_aureum_31082012.jpg',
        common_names=['Golden Pothos', "Devil's Ivy", "Devil's Vine"],
        genus_species='Epipremnum aureum',
        family='Araceae',
        native_range='Southeast Asia',
        temp_range='55-85',
        light='Low-Bright Indirect',
        soil_type='Well-draining and rich',
        water_when='Water when the top one to two inches of soil is dry.',
        fertilization='Use a well-balanced fertilizer at half strength every two to four weeks during the growing season',
        pests=['spider mites', 'scale', 'mealybugs'],
        propogation_methods=['stem cuttings'],
        toxic_to_pets=True
    )
    adansonii = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/adansonii-large.jpg',
        common_names=['Swiss Cheese Plant', 'Five Holes Plant',
                      "Swiss Cheese Vine"],
        genus_species='Monstera adansonii',
        family='Araceae',
        native_range='Central and South America',
        temp_range='68-86',
        light='Bright Indirect',
        soil_type='Well-draining',
        water_when='Water when the top two inches of soil is dry.',
        fertilization='Use a well-balanced fertilizer at half strength every two to four weeks during the growing season',
        pests=['spider mites', 'thrips', 'scale', 'aphids', 'mealybugs'],
        propogation_methods=['stem-cuttings'],
        toxic_to_pets=True
    )
    deliciosa = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/1280px-Starr_080731-9572_Monstera_deliciosa.jpg',
        common_names=['Swiss Cheese Plant', 'Split-Leaf Philodendron',
                      "Cheese Plant"],
        genus_species='Monstera deliciosa',
        family='Araceae',
        native_range='Tropical forest of southern Mexico, south to Panama',
        temp_range='68-86',
        light='Bright Indirect',
        soil_type='Well-draining',
        water_when='Water when the top two inches of soil is dry.',
        fertilization='Use a well-balanced fertilizer at half strength every two to four weeks during the growing season',
        pests=['spider mites', 'thrips', 'scale', 'aphids', 'mealybugs'],
        propogation_methods=['stem-cuttings'],
        toxic_to_pets=True
    )
    philodendron = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/philodendron-cordatum-hanging-basket.jpg',
        common_names=['Heart-Leaf Philodendron',
                      'Philodendron Scandens', 'Heart-Leaf Vine'],
        genus_species='Philodenron hederaceum',
        family='Araceae',
        native_range='Central America and the Caribbean',
        temp_range='60-75',
        light='Bright Indirect',
        soil_type='Rich, Well-draining',
        water_when='Water when the top inch of soil is dry.',
        fertilization='Use a well-balanced fertilizer at half strength every two to four weeks during the growing season',
        pests=['spider mites', 'thrips', 'scale', 'aphids', 'mealybugs'],
        propogation_methods=['stem-cuttings'],
        toxic_to_pets=True
    )
    syngonium = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/Zingiber_malaysianum.jpg',
        common_names=['Arrowhead Plant', 'Arrowhead Vine', 'Arrowhead Philodendron',
                      'Goosefoot', 'Nephthytis', 'African Evergreen', 'American Evergreen'],
        genus_species='Syngonium podophyllum',
        family='Araceae',
        native_range='Latin America, from Mexico through Bolivia',
        temp_range='60-75',
        light='Medium to Bright Indirect',
        soil_type='Rich, Well-draining',
        water_when='Water when the top inch of soil is dry.',
        fertilization='Use a well-balanced fertilizer at half strength every two to four weeks during the growing season',
        pests=['spider mites', 'thrips', 'scale', 'aphids', 'mealybugs'],
        propogation_methods=['stem-cuttings'],
        toxic_to_pets=True
    )
    zz = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/zz-plant-care-tips.png',
        common_names=['ZZ Plant', 'Zanzibar Gem', 'Zuzu Plant',
                      'Aroid Palm', 'Eternity Plant', 'Emerald Palm'],
        genus_species='Zamioculcas zamiifolia',
        family='Araceae',
        native_range='Eastern Africa, from southern Kenya to Northeastern South Africa',
        temp_range='65-75',
        light='Low to Bright Indirect',
        soil_type='Well-draining',
        water_when='Water when soil is completely dry.',
        fertilization='Use a well-balanced fertilizer at half strength monthly during the growing season',
        pests=['spider mites', 'aphids', 'mealybugs'],
        propogation_methods=['stem-cuttings', 'division'],
        toxic_to_pets=True
    )
    rhaphidophora = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/rhaphidophera.jpg',
        common_names=['Mini Monstera',
                      'Philodendron Ginny', 'Philodendron Piccolo'],
        genus_species='Rhaphidophora tetrasperma',
        family='Araceae',
        native_range='Southern Thailand and Malaysia',
        temp_range='55-80',
        light='Bright Indirect',
        soil_type='Rich, Well-draining',
        water_when='Water when the top inch of soil is dry.',
        fertilization='Use a well-balanced fertilizer at half strength every two to four weeks during the growing season',
        pests=['spider mites', 'thrips', 'scale', 'aphids', 'mealybugs'],
        propogation_methods=['stem-cuttings'],
        toxic_to_pets=True
    )
    fatsia = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/fatsia-japonica.jpg',
        common_names=['Japanese Aralia',
                      'Glossy-leaf Paper Plant, Fatsi, Paperplant, False Castor Oil Plant'],
        genus_species='Fatsia japonica',
        family='Araliaceae',
        native_range='Southern Japan, Taiwan and South Korea',
        temp_range='60-80',
        light='Bright Indirect',
        soil_type='Any potting soil, likes slightly acidic',
        water_when='Water when the top inch of soil is dry, less in winter.',
        fertilization='Use a well-balanced fertilizer at half strength every two weeks during the growing season',
        pests=['spider mites', 'scale', 'aphids', 'mealybugs'],
        propogation_methods=['stem-cuttings', 'seeds', 'air layering'],
        toxic_to_pets=False
    )
    parlor = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/parlor-palm.jpeg',
        common_names=['Parlor Palm', 'Neanthe Bella Palm'],
        genus_species='Chamaeodorea elegans',
        family='Arecaceae',
        native_range='Rain forests in Southern Mexico and Guatemala',
        temp_range='65-80',
        light='Bright Indirect',
        soil_type='Well-draining',
        water_when='Water when the top two inches of soil is dry, less in winter.',
        fertilization='Use a well-balanced fertilizer at half strength monthly during the growing season',
        pests=['spider mites', 'scale'],
        propogation_methods=['seeds'],
        toxic_to_pets=False
    )
    dragon = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/dracaena-dracaena-marginata-candelabra.jpg',
        common_names=['Dragon Tree', 'Dragon Plant', 'Madagascar Dragon Tree'],
        genus_species='Dracaena marginata',
        family='Asparagaceae',
        native_range='Madagascar',
        temp_range='65-75',
        light='Bright indirect to full sun',
        soil_type='Loamy, well-draining',
        water_when='Water when the soil is dry.',
        fertilization='Use a well-balanced fertilizer at half strength annually at the start of the growing season',
        pests=['spider mites', 'scale'],
        propogation_methods=['stem cuttings'],
        toxic_to_pets=True
    )
    aloe = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/aloe.jpg',
        common_names=['Aloe', 'Aloe Vera'],
        genus_species='Aloe barbadensis',
        family='Asphodelaceae',
        native_range='North African Mediterranean',
        temp_range='50-80',
        light='Bright indirect to full sun',
        soil_type='Succulent mix',
        water_when='Water when the soil is completely dry.',
        fertilization='Use a succulent or well-balanced fertilizer once during spring and once again during summer ',
        pests=['spider mites', 'gall mites'],
        propogation_methods=['stem cuttings', 'pups', 'root division'],
        toxic_to_pets=True
    )
    jade = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/Crassula_bonsai.jpg',
        common_names=['Jade Plant', 'Lucky Plant',
                      'Money Plant', 'Money Tree'],
        genus_species='Crassula ovata',
        family='Crassulaceae',
        native_range='Eastern South Africa',
        temp_range='50-80',
        light='Bright indirect to full sun',
        soil_type='Succulent mix',
        water_when='Water when the soil is completely dry.',
        fertilization='Use a succulent or well-balanced fertilizer once during spring and once again during summer ',
        pests=['mealybugs'],
        propogation_methods=['stem cuttings', 'leaf cuttings'],
        toxic_to_pets=True
    )
    pilea = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/Pilea_peperomioides_Chinese_money_plant.jpg',
        common_names=['Chinese Money Plant', 'Missionary Plant'],
        genus_species='Pilea peperomioides',
        family='Urticaceae',
        native_range='Yunnan Province in Southern China at the foot of the HImalayas',
        temp_range='65-75',
        light='Bright indirect',
        soil_type='Rich, well-draining',
        water_when='Water when the top inch of soil is dry.',
        fertilization='Use a well-balanced fertilizer monthly during the growing season',
        pests=['thrips, aphids'],
        propogation_methods=['stem cuttings', 'babies'],
        toxic_to_pets=False
    )
    ctenanthe = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/Ctenanthe_burle-marxii.jpg',
        common_names=['Fishbone Prayer Plant',
                      'Never Never Plant', 'Prayer Plant'],
        genus_species='Ctenanthe burle-marxii',
        family='Marantaceae',
        native_range='Tropical Brazil',
        temp_range='60-75',
        light='Low to Medium indirect',
        soil_type='Rich and well-draining, African Violet soil works well',
        water_when='Water when the top of the soil begins to feel dry.',
        fertilization='Use a well-balanced fertilizer monthly during the growing season',
        pests=['mealybugs', 'thrips', 'spider mites'],
        propogation_methods=['seeds', 'root division'],
        toxic_to_pets=False
    )
    maranta = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/Maranta_leuconeura3.jpg',
        common_names=['Prayer Plant'],
        genus_species='Maranta leuconeura var. kerchoveana',
        family='Marantaceae',
        native_range='Rainforests of Brazil',
        temp_range='60-80',
        light='Low to bright indirect',
        soil_type='Rich and well-draining, African Violet soil works well',
        water_when='Water when the top of the soil begins to feel dry.',
        fertilization='Use a well-balanced fertilizer monthly during the growing season',
        pests=['spider mites', 'mealybugs'],
        propogation_methods=['stem cuttings', 'root division'],
        toxic_to_pets=False
    )
    red_maranta = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/maranta-leuconeura-erythroneura.jpeg',
        common_names=['Red Vein Prayer Plant', 'Prayer Plant'],
        genus_species='Maranta leuconeura var. erythroneura',
        family='Marantaceae',
        native_range='Rainforests of Brazil',
        temp_range='60-80',
        light='Low to bright indirect',
        soil_type='Rich, well-draining, African Violet soil works well',
        water_when='Water when the top of the soil begins to feel dry.',
        fertilization='Use a well-balanced fertilizer monthly during the growing season',
        pests=['spider mites', 'mealybugs'],
        propogation_methods=['stem cuttings', 'root division'],
        toxic_to_pets=False
    )

    db.session.add(boston_fern)
    db.session.add(tradescantia)
    db.session.add(hypoestes)
    db.session.add(chlorophytum)
    db.session.add(polly)
    db.session.add(anthurium)
    db.session.add(pothos)
    db.session.add(adansonii)
    db.session.add(deliciosa)
    db.session.add(philodendron)
    db.session.add(syngonium)
    db.session.add(zz)
    db.session.add(rhaphidophora)
    db.session.add(fatsia)
    db.session.add(parlor)
    db.session.add(dragon)
    db.session.add(jade)
    db.session.add(pilea)
    db.session.add(maranta)
    db.session.add(ctenanthe)
    db.session.add(red_maranta)

    db.session.commit()


def undo_profiles():
    db.session.execute('TRUNCATE profiles;')
    db.session.commit()
