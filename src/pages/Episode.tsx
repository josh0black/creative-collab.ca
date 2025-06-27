
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Search, Calendar, Clock, Tag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Sample episode data with transcript
const episodeData = {
  "1": {
    title: "The Art of Creative Collaboration",
    description: "Exploring how creative minds come together to produce extraordinary work. We dive deep into the psychology and practical aspects of collaborative creativity.",
    videoId: "dQw4w9WgXcQ", // YouTube video ID
    duration: "24:15",
    publishDate: "2024-01-15",
    tags: ["creativity", "collaboration", "psychology"],
    transcript: [
      { time: "00:00", speaker: "Host", text: "Welcome to Creative Collab, the show where we explore the fascinating world of creative collaboration. I'm your host, and today we're diving deep into the art of bringing creative minds together." },
      { time: "00:30", speaker: "Host", text: "Creative collaboration isn't just about working together - it's about creating something that's greater than the sum of its parts. When done right, it can lead to breakthrough innovations and extraordinary results." },
      { time: "01:15", speaker: "Host", text: "But what makes collaboration truly creative? It starts with understanding that every person brings a unique perspective, a different way of seeing the world and solving problems." },
      { time: "02:00", speaker: "Host", text: "In today's episode, we'll explore the psychology behind successful creative partnerships, the common pitfalls to avoid, and practical strategies you can implement in your own collaborative work." },
      { time: "02:45", speaker: "Host", text: "One of the most important aspects of creative collaboration is establishing psychological safety. Team members need to feel comfortable sharing wild ideas, making mistakes, and building on each other's concepts without fear of judgment." },
      { time: "03:30", speaker: "Host", text: "Research shows that the most innovative teams are those where members feel safe to take risks and express dissenting opinions. This psychological safety is the foundation upon which all great collaborative work is built." }
    ]
  },
  // Add more episodes as needed
};

const Episode = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  
  const episode = episodeData[id as keyof typeof episodeData];

  if (!episode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Episode not found</h1>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Episodes
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const filteredTranscript = episode.transcript.filter(item =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.speaker.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShare = () => {
    navigator.share({
      title: episode.title,
      text: episode.description,
      url: window.location.href,
    }).catch(() => {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Episodes
              </Link>
            </Button>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Creative Collab
            </h1>
            <Button onClick={handleShare} variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Section */}
            <Card className="overflow-hidden shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${episode.videoId}`}
                    title={episode.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Episode Info */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold text-slate-800 mb-3">
                      {episode.title}
                    </CardTitle>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      {episode.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {episode.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(episode.publishDate).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {episode.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
            </Card>

            {/* Transcript Section */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-slate-800">
                    Episode Transcript
                  </CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Search transcript..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {filteredTranscript.map((item, index) => (
                    <div key={index} className="flex gap-4 p-4 hover:bg-slate-50 rounded-lg transition-colors">
                      <div className="flex-shrink-0 text-sm text-blue-600 font-mono font-medium min-w-[60px]">
                        {item.time}
                      </div>
                      <div className="flex-shrink-0 text-sm font-semibold text-slate-700 min-w-[60px]">
                        {item.speaker}:
                      </div>
                      <div className="text-slate-600 leading-relaxed">
                        {searchTerm && item.text.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                          <span dangerouslySetInnerHTML={{
                            __html: item.text.replace(
                              new RegExp(`(${searchTerm})`, 'gi'),
                              '<mark class="bg-yellow-200 px-1 rounded">$1</mark>'
                            )
                          }} />
                        ) : (
                          item.text
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredTranscript.length === 0 && searchTerm && (
                  <div className="text-center py-8 text-slate-500">
                    No transcript segments found matching "{searchTerm}"
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* More Episodes */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-800">
                  More Episodes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild className="w-full" variant="outline">
                  <Link to="/">
                    View All Episodes
                  </Link>
                </Button>
                <Separator />
                <p className="text-sm text-slate-600">
                  Discover more insights about creative collaboration in our complete episode library.
                </p>
              </CardContent>
            </Card>

            {/* Subscribe CTA */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-red-50 to-red-100">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-800">
                  Never Miss an Episode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  Subscribe to our YouTube channel for the latest episodes and exclusive content.
                </p>
                <Button asChild className="w-full bg-red-600 hover:bg-red-700">
                  <a href="https://www.youtube.com/@Creative_Collaborators" target="_blank" rel="noopener noreferrer">
                    Subscribe on YouTube
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Episode;
