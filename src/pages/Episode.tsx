import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Search, Calendar, Clock, Tag, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Episode data with sample transcripts
const episodeData = {
  "1": {
    title: "Defining Success for a Video Project",
    description: "Before you decide what video you are going to make, you need to know why you are making it. In this week's episode, my cohost Josh Usheroff and I discuss how to define and measure success of video and animation projects. Whether you are a marketer, work at an agency or are a video maker, this episode has some great tips to set your projects up for success.",
    videoId: "sS7A71biEhM",
    duration: "4:32",
    publishDate: "2024-01-15",
    tags: ["success", "planning", "strategy"],
    transcript: [
      { time: "00:00", speaker: "Noah", text: "Welcome to Creative Collab. Today we're talking about defining success for video projects before you even start creating." },
      { time: "00:15", speaker: "Josh", text: "This is probably one of the most overlooked aspects of video production - knowing why you're making the video in the first place." },
      { time: "00:30", speaker: "Noah", text: "The key is to establish clear, measurable goals upfront. What does success look like for this specific project?" },
      { time: "01:00", speaker: "Josh", text: "And it's not just about views or engagement. Success could be brand awareness, lead generation, or even internal communication goals." },
      { time: "01:30", speaker: "Noah", text: "When you define success clearly, every creative decision becomes easier because you have a north star to guide you." }
    ]
  },
  "2": {
    title: "Giving Effective Feedback",
    description: "When it comes to giving feedback, are you confident or anxious? Do feel like you have the tools to give effective feedback to get the most out of your video and animation projects? This episode of Creative Collab is primarily for all the marketing folks and agency creatives out there, to help you get the most out of video collabs, but I think there is a lot of good info in here for colleagues as well to give you some best practices for giving good constructive feedback.",
    videoId: "BBxJlUx54k8",
    duration: "5:18",
    publishDate: "2024-01-22",
    tags: ["feedback", "communication", "collaboration"],
    transcript: [
      { time: "00:00", speaker: "Josh", text: "Giving effective feedback is a skill that can make or break your video projects." },
      { time: "00:20", speaker: "Noah", text: "Many people feel anxious about giving feedback, but it's essential for getting the best results." },
      { time: "00:45", speaker: "Josh", text: "The key is to be specific and actionable. Instead of saying 'I don't like it,' explain what specifically needs to change and why." }
    ]
  },
  "3": {
    title: "Managing Client Expectations",
    description: "Essential techniques for setting and managing realistic client expectations throughout the creative process.",
    videoId: "eJ1fKgMxpNc",
    duration: "4:45",
    publishDate: "2024-01-29",
    tags: ["clients", "expectations", "communication"],
    transcript: [
      { time: "00:00", speaker: "Noah", text: "Setting clear expectations upfront is crucial for project success." },
      { time: "00:25", speaker: "Josh", text: "Under-promise and over-deliver is still the best strategy." }
    ]
  },
  "4": {
    title: "Budgeting for Motion Graphics Projects",
    description: "A comprehensive guide to creating accurate budgets for motion graphics and video projects.",
    videoId: "q81dbYWMP94",
    duration: "6:12",
    publishDate: "2024-02-05",
    tags: ["budgeting", "business", "planning"],
    transcript: [
      { time: "00:00", speaker: "Josh", text: "Budgeting is where many creative projects go wrong from the start." },
      { time: "00:30", speaker: "Noah", text: "You need to account for every stage of production, not just the creative work." }
    ]
  },
  "5": {
    title: "Timeline Management for Video Production",
    description: "Learn how to create realistic timelines and manage deadlines effectively in video production workflows.",
    videoId: "_uFzI_Ud2WQ",
    duration: "5:33",
    publishDate: "2024-02-12",
    tags: ["timelines", "project management", "deadlines"],
    transcript: [
      { time: "00:00", speaker: "Noah", text: "Timeline management can make or break a video production project." },
      { time: "00:20", speaker: "Josh", text: "Always build in buffer time for unexpected challenges." }
    ]
  },
  "6": {
    title: "Working With Internal Teams",
    description: "How can working with internal content teams drive growth for your creative studio? And how can combining internal resources with outside expertise maximize the impact of your content? Find out on this week's Creative Collab.",
    videoId: "z2B5jeDNydY",
    duration: "5:47",
    publishDate: "2024-02-19",
    tags: ["internal teams", "collaboration", "growth"],
    transcript: [
      { time: "00:00", speaker: "Noah", text: "Today we're discussing how working with internal teams can drive growth for creative studios." },
      { time: "00:20", speaker: "Josh", text: "The key is understanding how to combine internal resources with outside expertise." },
      { time: "00:45", speaker: "Noah", text: "Internal teams bring deep brand knowledge and institutional memory that's invaluable." },
      { time: "01:10", speaker: "Josh", text: "But external partners can provide specialized skills and fresh perspectives." },
      { time: "01:35", speaker: "Noah", text: "The magic happens when these two forces work in harmony rather than in competition." }
    ]
  }
};

const Episode = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  
  const episode = episodeData[id as keyof typeof episodeData];

  if (!episode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-red-500 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Episode not found</h1>
          <Button asChild className="bg-white/20 hover:bg-white/30 text-white border-white/30">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-red-500">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button asChild variant="ghost" className="text-white hover:bg-white/20">
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Episodes
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-white">
              Creative Collab
            </h1>
            <Button onClick={handleShare} variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/20">
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
            <Card className="overflow-hidden shadow-lg border-0 bg-white/90 backdrop-blur-sm">
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
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
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
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
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
                      <div className="flex-shrink-0 text-sm text-purple-600 font-mono font-medium min-w-[60px]">
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
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-800">
                  More Episodes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-red-500 hover:from-blue-700 hover:via-purple-700 hover:to-red-600 text-white border-0">
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
            <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-slate-800">
                  Never Miss an Episode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 mb-4">
                  Subscribe to our YouTube channel for the latest episodes and exclusive content.
                </p>
                <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <a href="https://www.youtube.com/@Creative_Collaborators" target="_blank" rel="noopener noreferrer">
                    Subscribe on YouTube
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

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

export default Episode;
