
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
    title: "How to Deliver Feedback on Creative Work",
    description: "Learn effective strategies for giving constructive feedback on creative projects that helps teams improve while maintaining positive relationships.",
    thumbnail: "https://img.youtube.com/vi/sS7A71biEhM/maxresdefault.jpg",
    videoId: "sS7A71biEhM",
    duration: "4:32",
    publishDate: "2024-01-15",
    tags: ["feedback", "communication", "management"]
  },
  {
    id: "2", 
    title: "The Importance of Reference Material",
    description: "Discover how proper reference materials can transform your creative projects and streamline the production process.",
    thumbnail: "https://img.youtube.com/vi/XYZ123/maxresdefault.jpg",
    videoId: "XYZ123",
    duration: "5:18",
    publishDate: "2024-01-22",
    tags: ["references", "preparation", "workflow"]
  },
  {
    id: "3",
    title: "Managing Client Expectations",
    description: "Essential techniques for setting and managing realistic client expectations throughout the creative process.",
    thumbnail: "https://img.youtube.com/vi/ABC456/maxresdefault.jpg",
    videoId: "ABC456",
    duration: "4:45",
    publishDate: "2024-01-29",
    tags: ["clients", "expectations", "communication"]
  },
  {
    id: "4",
    title: "Budgeting for Motion Graphics Projects",
    description: "A comprehensive guide to creating accurate budgets for motion graphics and video projects.",
    thumbnail: "https://img.youtube.com/vi/DEF789/maxresdefault.jpg",
    videoId: "DEF789",
    duration: "6:12",
    publishDate: "2024-02-05",
    tags: ["budgeting", "business", "planning"]
  },
  {
    id: "5",
    title: "Timeline Management for Video Production",
    description: "Learn how to create realistic timelines and manage deadlines effectively in video production workflows.",
    thumbnail: "https://img.youtube.com/vi/GHI012/maxresdefault.jpg",
    videoId: "GHI012",
    duration: "5:33",
    publishDate: "2024-02-12",
    tags: ["timelines", "project management", "deadlines"]
  },
  {
    id: "6",
    title: "Working with Remote Creative Teams",
    description: "Best practices for collaborating with remote teams and maintaining creative quality across distances.",
    thumbnail: "https://img.youtube.com/vi/JKL345/maxresdefault.jpg",
    videoId: "JKL345",
    duration: "4:58",
    publishDate: "2024-02-19",
    tags: ["remote work", "collaboration", "teams"]
  },
  {
    id: "7",
    title: "Quality Control in Creative Projects",
    description: "Establish effective quality control processes to ensure consistent, high-quality creative output.",
    thumbnail: "https://img.youtube.com/vi/MNO678/maxresdefault.jpg",
    videoId: "MNO678",
    duration: "5:07",
    publishDate: "2024-02-26",
    tags: ["quality control", "processes", "standards"]
  },
  {
    id: "8",
    title: "Scope Creep: Prevention and Management",
    description: "Identify, prevent, and manage scope creep to keep your creative projects on track and profitable.",
    thumbnail: "https://img.youtube.com/vi/PQR901/maxresdefault.jpg",
    videoId: "PQR901",
    duration: "4:41",
    publishDate: "2024-03-05",
    tags: ["scope creep", "project management", "boundaries"]
  },
  {
    id: "9",
    title: "Creative Brief Development",
    description: "Master the art of creating comprehensive creative briefs that set projects up for success from the start.",
    thumbnail: "https://img.youtube.com/vi/STU234/maxresdefault.jpg",
    videoId: "STU234",
    duration: "5:24",
    publishDate: "2024-03-12",
    tags: ["creative brief", "planning", "communication"]
  },
  {
    id: "10",
    title: "Revision Rounds and Feedback Loops",
    description: "Optimize your revision process to maintain creative integrity while accommodating client feedback.",
    thumbnail: "https://img.youtube.com/vi/VWX567/maxresdefault.jpg",
    videoId: "VWX567",
    duration: "4:36",
    publishDate: "2024-03-19",
    tags: ["revisions", "feedback", "iteration"]
  },
  {
    id: "11",
    title: "Building Long-term Client Relationships",
    description: "Strategies for nurturing client relationships that lead to repeat business and referrals.",
    thumbnail: "https://img.youtube.com/vi/YZA890/maxresdefault.jpg",
    videoId: "YZA890",
    duration: "5:15",
    publishDate: "2024-03-26",
    tags: ["client relationships", "business development", "networking"]
  },
  {
    id: "12",
    title: "Technical Specifications and Deliverables",
    description: "Ensure smooth project delivery by properly defining technical specifications and deliverable formats.",
    thumbnail: "https://img.youtube.com/vi/BCD123/maxresdefault.jpg",
    videoId: "BCD123",
    duration: "4:52",
    publishDate: "2024-04-02",
    tags: ["technical specs", "deliverables", "formats"]
  },
  {
    id: "13",
    title: "Creative Team Roles and Responsibilities",
    description: "Define clear roles and responsibilities to maximize efficiency and minimize conflicts in creative teams.",
    thumbnail: "https://img.youtube.com/vi/EFG456/maxresdefault.jpg",
    videoId: "EFG456",
    duration: "5:03",
    publishDate: "2024-04-09",
    tags: ["roles", "responsibilities", "team structure"]
  },
  {
    id: "14",
    title: "Post-Production Workflow Optimization",
    description: "Streamline your post-production workflows for better efficiency and consistent quality output.",
    thumbnail: "https://img.youtube.com/vi/HIJ789/maxresdefault.jpg",
    videoId: "HIJ789",
    duration: "5:41",
    publishDate: "2024-04-16",
    tags: ["post-production", "workflow", "efficiency"]
  },
  {
    id: "15",
    title: "Pricing Creative Services Effectively",
    description: "Learn how to price your creative services competitively while maintaining profitability.",
    thumbnail: "https://img.youtube.com/vi/KLM012/maxresdefault.jpg",
    videoId: "KLM012",
    duration: "6:28",
    publishDate: "2024-04-23",
    tags: ["pricing", "business", "profitability"]
  },
  {
    id: "16",
    title: "Crisis Management in Creative Projects",
    description: "Prepare for and manage crises that can derail creative projects, from technical failures to client issues.",
    thumbnail: "https://img.youtube.com/vi/NOP345/maxresdefault.jpg",
    videoId: "NOP345",
    duration: "4:29",
    publishDate: "2024-04-30",
    tags: ["crisis management", "problem solving", "contingency"]
  },
  {
    id: "17",
    title: "Scaling Your Creative Business",
    description: "Strategies for growing your creative business while maintaining quality and team culture.",
    thumbnail: "https://img.youtube.com/vi/QRS678/maxresdefault.jpg",
    videoId: "QRS678",
    duration: "5:56",
    publishDate: "2024-05-07",
    tags: ["scaling", "business growth", "team building"]
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
      <footer className="bg-black/30 backdrop-blur-md text-white py-12 mt-16 border-t border-white/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Creative Collab</h3>
              <p className="text-white/80 mb-4">Actionable tips for video & motion graphics collaboration</p>
              <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white hover:text-slate-800">
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
