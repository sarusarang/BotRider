'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Clock, Route, Award } from 'lucide-react';
import HeroSlider from '@/components/events/HeroSlider';
import CountUp from '@/components/events/CountUp';
import { upcomingEvents, eventStats } from '@/data/events-data';

export default function EventsPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const heroSlides = [
        {
            image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1920&q=80',
            title: 'Upcoming Events',
            subtitle: 'Join our community rides, races, and workshops',
            cta: {
                text: 'Register Now',
                action: () => console.log('Register clicked')
            }
        },
        {
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80',
            title: 'Mountain Adventures',
            subtitle: 'Experience thrilling trails and breathtaking views',
            cta: {
                text: 'Explore Events',
                action: () => console.log('Explore clicked')
            }
        },
        {
            image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1920&q=80',
            title: 'Competitive Racing',
            subtitle: 'Test your limits in our championship events',
            cta: {
                text: 'View Races',
                action: () => console.log('View races clicked')
            }
        }
    ];

    const categories = [
        { id: 'all', label: 'All Events' },
        { id: 'ride', label: 'Rides' },
        { id: 'race', label: 'Races' },
        { id: 'workshop', label: 'Workshops' },
        { id: 'community', label: 'Community' }
    ];

    const filteredEvents = selectedCategory === 'all'
        ? upcomingEvents
        : upcomingEvents.filter(event => event.category === selectedCategory);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'beginner': return 'bg-green-100 text-green-700 border-green-200';
            case 'intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'advanced': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const statsData = [
        { icon: Calendar, value: 804, label: 'Rides & Events', color: 'from-blue-500 to-cyan-500' },
        { icon: Users, value: 3267, label: 'Users Joined', color: 'from-purple-500 to-pink-500' },
        { icon: Route, value: 30, suffix: ' kms', label: 'Distance Covered', color: 'from-orange-500 to-red-500' },
        { icon: Award, value: 70, label: 'Total Winners', color: 'from-green-500 to-emerald-500' }
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
            {/* Hero Slider */}
            <HeroSlider slides={heroSlides} />

            {/* Stats Section */}
            <section className="py-10 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
              
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                        {statsData.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="text-center group"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className={`w-20 h-20 mx-auto mb-6 bg-linear-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-2xl`}
                                >
                                    <stat.icon className="w-10 h-10 text-white" />
                                </motion.div>
                                <div className="text-5xl md:text-6xl font-bold mb-3 bg-linear-to-br from-white to-gray-300 bg-clip-text text-transparent">
                                    <CountUp end={stat.value} suffix={stat.suffix || ''} />
                                </div>
                                <div className="text-gray-400 font-medium text-sm md:text-base">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section className="py-12">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-10">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Our Rides & Events
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover exciting cycling events, from casual rides to competitive races
                        </p>
                    </motion.div>

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all ${selectedCategory === category.id
                                        ? 'bg-gray-900 text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:shadow-md'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </motion.div>

                    {/* Events Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:border-gray-300 transition-all duration-300 flex flex-col"
                            >
                                {/* Event Image */}
                                <div className="relative h-56 overflow-hidden shrink-0">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-br from-black/60 to-transparent" />

                                    {/* Difficulty Badge */}
                                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-lg text-xs font-bold border backdrop-blur-sm ${getDifficultyColor(event.difficulty)}`}>
                                        {event.difficulty.charAt(0).toUpperCase() + event.difficulty.slice(1)}
                                    </div>

                                    {/* Date Badge */}
                                    <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg">
                                        <div className="flex items-center gap-2 text-gray-900">
                                            <Calendar className="w-4 h-4" />
                                            <span className="font-semibold text-sm">{event.date}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Event Details */}
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                                        {event.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                        {event.description}
                                    </p>

                                    {/* Event Info */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                                            <MapPin className="w-4 h-4 shrink-0" />
                                            <span className="line-clamp-1">{event.location}</span>
                                        </div>
                                        {event.distance && (
                                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                                                <Route className="w-4 h-4 shrink-0" />
                                                <span>{event.distance}</span>
                                            </div>
                                        )}
                                        {event.duration && (
                                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                                                <Clock className="w-4 h-4 shrink-0" />
                                                <span>{event.duration}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Participants Progress */}
                                    {event.maxParticipants && (
                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-gray-600">Participants</span>
                                                <span className="font-semibold text-gray-900">
                                                    {event.participants}/{event.maxParticipants}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${(event.participants! / event.maxParticipants) * 100}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.2 }}
                                                    className="bg-linear-to-br from-gray-900 to-gray-600 h-2 rounded-full"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Spacer to push button to bottom */}
                                    <div className="flex-1" />

                                    {/* Register Button */}
                                    <button
                                        className={`w-full py-3 rounded-xl font-semibold transition-all mt-4 ${event.registrationOpen
                                                ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg hover:scale-105'
                                                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                            }`}
                                        disabled={!event.registrationOpen}
                                    >
                                        {event.registrationOpen ? 'Register Now' : 'Registration Closed'}
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Ready to Join the Ride?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Be part of our growing cycling community and experience the thrill of group rides
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-14 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all hover:scale-105">
                                Contact Us
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
