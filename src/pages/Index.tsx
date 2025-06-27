
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
    title: "The Art of Creative Collaboration",
    description: "Exploring how creative minds come together to produce extraordinary work. We dive deep into the psychology and practical aspects of collaborative creativity.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "24:15",
    publishDate: "2024-01-15",
    tags: ["creativity", "collaboration", "psychology"]
  },
  {
    id: "2", 
    title: "Building Creative Teams That Actually Work",
    description: "From hiring to managing, learn the secrets of assembling and leading creative teams that produce breakthrough results consistently.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "31:42",
    publishDate: "2024-01-22",
    tags: ["teams", "management", "leadership"]
  },
  {
    id: "3",
    title: "The Future of Creative Industries",
    description: "What's next for creative professionals? We explore emerging trends, technologies, and opportunities shaping the creative landscape.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "28:33",
    publishDate: "2024-01-29",
    tags: ["future", "technology", "trends"]
  },
  {
    id: "4",
    title: "Overcoming Creative Blocks",
    description: "Practical strategies and mindset shifts to break through creative barriers and maintain consistent creative output.",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "22:18",
    publishDate: "2024-02-05",
    tags: ["creativity", "productivity", "mindset"]
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
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white border-0">
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
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-6">
              About the Series
            </h2>
            <div className="text-white/90 space-y-4 text-lg leading-relaxed">
              <p>
                Produce marketing videos and motion graphics projects with confidence, with the help of these short actionable tips.
              </p>
              <p>
                If you are a brand marketing director, work in an ad agency, own a creative studio or freelance, these evergreen discussions will give you insight into the soft skills, processes, business and logistics questions for successful and stress-free collaboration for your video and animation projects.
              </p>
              <p>
                Each episode is a roughly five-minute focused conversation on one topic between Noah Wohl the Creative Director at motion graphics studio Handmade Creative and Josh Usheroff co-founder of live action studio Black Box Productions.
              </p>
            </div>
            
            {/* Links Section */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Studios</h3>
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
                <h3 className="text-xl font-semibold text-white mb-4">Hosts</h3>
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
                  <img
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play className="w-12 h-12 text-white" fill="currentColor" />
                  </div>
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
      <footer className="bg-black/20 backdrop-blur-md text-white py-8 mt-16 border-t border-white/20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-2">Creative Collab</h3>
          <p className="text-white/80 mb-4">Actionable tips for video & motion graphics collaboration</p>
          <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white hover:text-slate-800">
            <a href="https://www.youtube.com/@Creative_Collaborators" target="_blank" rel="noopener noreferrer">
              Subscribe on YouTube
            </a>
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Index;
