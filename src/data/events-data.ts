export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
    image: string;
    category: 'ride' | 'race' | 'workshop' | 'community';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    distance?: string;
    duration?: string;
    participants?: number;
    maxParticipants?: number;
    registrationOpen: boolean;
}

export const upcomingEvents: Event[] = [
    {
        id: 'event_001',
        title: 'Vennakkat Ride',
        date: 'Jan 18th 2026',
        location: 'Vennakkat, Kerala',
        description: 'Join us for an exciting ride through the scenic routes of Vennakkat. Perfect for all skill levels!',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        category: 'ride',
        difficulty: 'beginner',
        distance: '25 km',
        duration: '3 hours',
        participants: 45,
        maxParticipants: 60,
        registrationOpen: true
    },
    {
        id: 'event_002',
        title: 'Mountain Trail Challenge',
        date: 'Jan 25th 2026',
        location: 'Munnar, Kerala',
        description: 'Experience the thrill of mountain biking through challenging terrains and breathtaking views.',
        image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&q=80',
        category: 'race',
        difficulty: 'advanced',
        distance: '45 km',
        duration: '5 hours',
        participants: 28,
        maxParticipants: 40,
        registrationOpen: true
    },
    {
        id: 'event_003',
        title: 'Coastal Sunset Ride',
        date: 'Feb 1st 2026',
        location: 'Kovalam Beach',
        description: 'A relaxing evening ride along the beautiful coastal roads with stunning sunset views.',
        image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80',
        category: 'ride',
        difficulty: 'beginner',
        distance: '15 km',
        duration: '2 hours',
        participants: 52,
        maxParticipants: 80,
        registrationOpen: true
    },
    {
        id: 'event_004',
        title: 'Bike Maintenance Workshop',
        date: 'Feb 8th 2026',
        location: 'Cycle Hub, Kochi',
        description: 'Learn essential bike maintenance skills from expert mechanics. Hands-on training included!',
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80',
        category: 'workshop',
        difficulty: 'beginner',
        duration: '4 hours',
        participants: 18,
        maxParticipants: 25,
        registrationOpen: true
    },
    {
        id: 'event_005',
        title: 'City Night Ride',
        date: 'Feb 14th 2026',
        location: 'Kochi City',
        description: 'Explore the city lights on two wheels. A fun community ride through illuminated streets.',
        image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&q=80',
        category: 'community',
        difficulty: 'beginner',
        distance: '20 km',
        duration: '2.5 hours',
        participants: 65,
        maxParticipants: 100,
        registrationOpen: true
    },
    {
        id: 'event_006',
        title: 'Hill Climb Championship',
        date: 'Feb 22nd 2026',
        location: 'Wayanad Hills',
        description: 'Test your endurance in this challenging uphill race. Only for experienced riders!',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80',
        category: 'race',
        difficulty: 'advanced',
        distance: '35 km',
        duration: '4 hours',
        participants: 22,
        maxParticipants: 30,
        registrationOpen: true
    }
];

export const eventStats = {
    totalEvents: 804,
    usersJoined: 3267,
    distanceCovered: '30 kms',
    totalWinners: 70
};
