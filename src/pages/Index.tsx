
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Play, Calendar, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Sample episode data - in a real app, this would come from an API or CMS
const episodes = [
  {
    id: "1",
    title: "Defining Success for a Video Project",
    description: "Before you decide what video you are going to make, you need to know why you are making it. In this week's episode, my cohost Josh Usheroff and I discuss how to define and measure success of video and animation projects. Whether you are a marketer, work at an agency or are a video maker, this episode has some great tips to set your projects up for success.",
    thumbnail: "https://img.youtube.com/vi/sS7A71biEhM/maxresdefault.jpg",
    videoId: "sS7A71biEhM",
    duration: "4:32",
    publishDate: "2024-01-15",
    tags: ["success", "planning", "strategy"]
  },
  {
    id: "2", 
    title: "Giving Effective Feedback",
    description: "When it comes to giving feedback, are you confident or anxious? Do feel like you have the tools to give effective feedback to get the most out of your video and animation projects? This episode of Creative Collab is primarily for all the marketing folks and agency creatives out there, to help you get the most out of video collabs, but I think there is a lot of good info in here for colleagues as well to give you some best practices for giving good constructive feedback.",
    thumbnail: "https://img.youtube.com/vi/BBxJlUx54k8/maxresdefault.jpg",
    videoId: "BBxJlUx54k8",
    duration: "5:18",
    publishDate: "2024-01-22",
    tags: ["feedback", "communication", "collaboration"]
  },
  {
    id: "3",
    title: "Managing Client Expectations",
    description: "Essential techniques for setting and managing realistic client expectations throughout the creative process.",
    thumbnail: "https://img.youtube.com/vi/eJ1fKgMxpNc/maxresdefault.jpg",
    videoId: "eJ1fKgMxpNc",
    duration: "4:45",
    publishDate: "2024-01-29",
    tags: ["clients", "expectations", "communication"]
  },
  {
    id: "4",
    title: "Budgeting for Motion Graphics Projects",
    description: "A comprehensive guide to creating accurate budgets for motion graphics and video projects.",
    thumbnail: "https://img.youtube.com/vi/q81dbYWMP94/maxresdefault.jpg",
    videoId: "q81dbYWMP94",
    duration: "6:12",
    publishDate: "2024-02-05",
    tags: ["budgeting", "business", "planning"]
  },
  {
    id: "5",
    title: "Timeline Management for Video Production",
    description: "Learn how to create realistic timelines and manage deadlines effectively in video production workflows.",
    thumbnail: "https://img.youtube.com/vi/_uFzI_Ud2WQ/maxresdefault.jpg",
    videoId: "_uFzI_Ud2WQ",
    duration: "5:33",
    publishDate: "2024-02-12",
    tags: ["timelines", "project management", "deadlines"]
  },
  {
    id: "6",
    title: "Working With Internal Teams",
    description: "How can working with internal content teams drive growth for your creative studio? And how can combining internal resources with outside expertise maximize the impact of your content? Find out on this week's Creative Collab.",
    thumbnail: "https://img.youtube.com/vi/z2B5jeDNydY/maxresdefault.jpg",
    videoId: "z2B5jeDNydY",
    duration: "5:47",
    publishDate: "2024-02-19",
    tags: ["internal teams", "collaboration", "growth"]
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEpisodes = episodes.filter(episode =>
    episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    episode.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    episode.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-red-500">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Creative Collab
              </h1>
              <p className="text-white/90 text-lg">Short actionable tips for video & motion graphics projects</p>
            </div>
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-lg">
              <a href="https://www.youtube.com/@Creative_Collaborators" target="_blank" rel="noopener noreferrer">
                <Play className="w-4 h-4 mr-2" />
                Watch on YouTube
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-12 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">
              About the Series
            </h2>
            <div className="text-white/90 space-y-3 leading-relaxed">
              <p>
                Produce marketing videos and motion graphics projects with confidence, with the help of these short actionable tips.
              </p>
              <p>
                If you are a brand marketing director, work in an ad agency, own a creative studio or freelance, these evergreen discussions will give you insight into the soft skills, processes, business and logistics questions for successful and stress-free collaboration for your video and animation projects.
              </p>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search episodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg bg-white/20 border-white/30 focus:border-white/50 rounded-full text-white placeholder:text-white/60"
            />
          </div>
        </div>

        {/* Episodes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEpisodes.map((episode, index) => (
            <Card key={episode.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden hover:bg-white">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <Link to={`/episode/${episode.id}`}>
                    <img
                      src={episode.thumbnail}
                      alt={episode.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" fill="currentColor" />
                    </div>
                  </Link>
                  <Badge className="absolute top-3 right-3 bg-black/70 text-white">
                    Episode {episode.id}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-purple-600 transition-colors">
                  {episode.title}
                </h3>
                <p className="text-slate-600 mb-4 line-clamp-3">
                  {episode.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {episode.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(episode.publishDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {episode.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button asChild className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-red-500 hover:from-blue-700 hover:via-purple-700 hover:to-red-600 text-white border-0">
                  <Link to={`/episode/${episode.id}`}>
                    Watch Episode
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEpisodes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-white/80">No episodes found matching your search.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-md text-white py-12 mt-16 border-t border-white/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Creative Collab</h3>
              <p className="text-white/80 mb-4">Actionable tips for video & motion graphics collaboration</p>
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white border-0 shadow-lg">
                <a href="https://www.youtube.com/@Creative_Collaborators" target="_blank" rel="noopener noreferrer">
                  Subscribe on YouTube
                </a>
              </Button>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-4">Studios</h4>
              <div className="space-y-2">
                <a href="https://handmadecreative.ca" target="_blank" rel="noopener noreferrer" 
                   className="block text-white/80 hover:text-white transition-colors">
                  Handmade Creative →
                </a>
                <a href="https://blackboxproductions.tv" target="_blank" rel="noopener noreferrer"
                   className="block text-white/80 hover:text-white transition-colors">
                  Black Box Productions →
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-4">Hosts</h4>
              <div className="space-y-2">
                <a href="https://linkedin.com/in/noah-wohl" target="_blank" rel="noopener noreferrer"
                   className="block text-white/80 hover:text-white transition-colors">
                  Noah's LinkedIn →
                </a>
                <a href="https://linkedin.com/in/joshusheroff" target="_blank" rel="noopener noreferrer"
                   className="block text-white/80 hover:text-white transition-colors">
                  Josh's LinkedIn →
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
