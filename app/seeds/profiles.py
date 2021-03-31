from app.models import db, Profile


def seed_profiles():
    boston_fern = Profile(
        picture='https://newgrowthbucket.s3.amazonaws.com/Boston_Fern_(Nephrolepis_exaltata)_1.jpg',
        common_names=['Boston Fern', 'Sword Fern',
                      'Fishbone Fern', 'Tuber Ladder Fern'],
        genus_species='Nephrolepis Exaltata',
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
        common_names=['Wandering Jew', 'Inch Plant',
                      'Spiderwort'],
        genus_species='Tradescantia Zebrina',
        family='Commelinaceae',
        native_range='Wetland and rainforest, river banks at lower altitudes. Native to Mexico, Central America, Columbia, and the Caribbean islands.',
        temp_range='50-86',
        light='Bright Indirect',
        soil_type='Well-draining and compost rich',
        water_when='Water when the top inch of soil is dry.',
        fertilization='Use a well-balanced fertilizer at 1/2-strength monthly during the growign season.',
        pests=['spider mites', 'mealybugs',
               'aphids', 'whitefly', 'scale', 'thrips'],
        propogation_methods=['stem cuttings', 'seed'],
        toxic_to_pets=True
    )
    db.session.add(boston_fern)
    db.session.add(tradescantia)

    db.session.commit()


def undo_profiles():
    db.session.execute('TRUNCATE profiles;')
    db.session.commit()
