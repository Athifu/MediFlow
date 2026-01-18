import React, { useState } from 'react';
import { MessageSquare, Heart, Share2, Search, Plus, User, Shield, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_POSTS = [
    { id: 1, author: "Sarah M.", avatar: "bg-rose-100 text-rose-600", role: "Patient", title: "Recovering from ACL Surgery - Tips?", content: "Just had my surgery yesterday. Any tips for the first week of recovery? I'm feeling a bit anxious about the pain management.", interactions: { likes: 24, comments: 8 }, tags: ["Surgery", "Recovery"], time: "2h ago" },
    { id: 2, author: "Dr. Wilson", avatar: "bg-blue-100 text-blue-600", role: "Verified Doctor", title: "Weekly Health Tip: Hydration", content: "Remember that staying hydrated is key to faster recovery. Aim for at least 3 liters of water per day unless restricted by your condition.", interactions: { likes: 156, comments: 12 }, tags: ["Wellness", "Tips"], time: "5h ago" },
    { id: 3, author: "James K.", avatar: "bg-emerald-100 text-emerald-600", role: "Patient", title: "Great experience with the new rehab center", content: "The staff at the new wing are amazing. Just wanted to share some positivity!", interactions: { likes: 45, comments: 2 }, tags: ["Review", "Positive"], time: "1d ago" },
];

export default function Community() {
    const [posts, setPosts] = useState(MOCK_POSTS);

    return (
        <div className="min-h-screen bg-slate-50 p-8 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link to="/patient/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold">
                        <ChevronRight className="rotate-180 w-5 h-5" /> Back
                    </Link>
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors">
                            <Plus className="w-5 h-5" /> New Post
                        </button>
                    </div>
                </div>

                <div className="flex items-end justify-between mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <div className="bg-gradient-to-br from-rose-500 to-orange-500 p-2 rounded-xl text-white">
                            <Heart className="w-8 h-8" />
                        </div>
                        MediFlow Community
                    </h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search topics..."
                            className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 w-80 shadow-sm"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    {['All Topics', 'Recovery', 'Wellness', 'Mental Health', 'Nutrition', 'Events'].map((cat, i) => (
                        <button key={i} className={`px-5 py-2 rounded-full font-bold whitespace-nowrap transition-colors ${i === 0 ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-400'}`}>
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Feed */}
                <div className="space-y-6">
                    {posts.map(post => (
                        <div key={post.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold uppercase ${post.avatar}`}>
                                        {post.author.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                            {post.author}
                                            {post.role.includes('Verified') && <Shield className="w-4 h-4 text-blue-500 fill-blue-500" />}
                                        </h3>
                                        <p className="text-xs text-slate-400 font-bold">{post.role} • {post.time}</p>
                                    </div>
                                </div>
                                <button className="text-slate-300 hover:text-slate-500">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>

                            <h2 className="text-xl font-bold text-slate-800 mb-2">{post.title}</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">{post.content}</p>

                            <div className="flex items-center gap-2 mb-6">
                                {post.tags.map((tag, i) => (
                                    <span key={i} className="px-2 py-1 bg-slate-50 text-slate-500 text-xs font-bold rounded uppercase tracking-wider">#{tag}</span>
                                ))}
                            </div>

                            <div className="h-px bg-slate-50 mb-4"></div>

                            <div className="flex items-center gap-6">
                                <button className="flex items-center gap-2 text-slate-400 hover:text-rose-500 font-bold text-sm transition-colors">
                                    <Heart className="w-5 h-5" /> {post.interactions.likes} Likes
                                </button>
                                <button className="flex items-center gap-2 text-slate-400 hover:text-blue-500 font-bold text-sm transition-colors">
                                    <MessageSquare className="w-5 h-5" /> {post.interactions.comments} Comments
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
