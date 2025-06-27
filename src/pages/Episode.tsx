
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
    title: "How to Deliver Feedback on Creative Work",
    description: "Learn effective strategies for giving constructive feedback on creative projects that helps teams improve while maintaining positive relationships.",
    videoId: "sS7A71biEhM",
    duration: "4:32",
    publishDate: "2024-01-15",
    tags: ["feedback", "communication", "management"],
    transcript: [
      { time: "00:00", speaker: "Noah", text: "Welcome to Creative Collab. Today we're talking about how to deliver feedback on creative work effectively." },
      { time: "00:15", speaker: "Josh", text: "This is probably one of the most important skills for anyone working with creative teams." },
      { time: "00:30", speaker: "Noah", text: "The key is to be specific and actionable. Instead of saying 'I don't like it,' explain what specifically needs to change." },
      { time: "01:00", speaker: "Josh", text: "And always focus on the work, not the person. It's about improving the project, not criticizing the individual." },
      { time: "01:30", speaker: "Noah", text: "Timing is crucial too. Give feedback when people are ready to receive it, not when you're frustrated." }
    ]
  },
  "2": {
    title: "The Importance of Reference Material",
    description: "Discover how proper reference materials can transform your creative projects and streamline the production process.",
    videoId: "XYZ123",
    duration: "5:18",
    publishDate: "2024-01-22",
    tags: ["references", "preparation", "workflow"],
    transcript: [
      { time: "00:00", speaker: "Josh", text: "Reference materials are the foundation of any successful creative project." },
      { time: "00:20", speaker: "Noah", text: "They help align everyone's vision from the very beginning." },
      { time: "00:45", speaker: "Josh", text: "When clients provide good references, it saves hours of revision cycles." }
    ]
  },
  "3": {
    title: "Managing Client Expectations",
    description: "Essential techniques for setting and managing realistic client expectations throughout the creative process.",
    videoId: "ABC456",
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
    videoId: "DEF789",
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
    videoId: "GHI012",
    duration: "5:33",
    publishDate: "2024-02-12",
    tags: ["timelines", "project management", "deadlines"],
    transcript: [
      { time: "00:00", speaker: "Noah", text: "Timeline management can make or break a video production project." },
      { time: "00:20", speaker: "Josh", text: "Always build in buffer time for unexpected challenges." }
    ]
  },
  "6": {
    title: "Working with Remote Creative Teams",
    description: "Best practices for collaborating with remote teams and maintaining creative quality across distances.",
    videoId: "JKL345",
    duration: "4:58",
    publishDate: "2024-02-19",
    tags: ["remote work", "collaboration", "teams"],
    transcript: [
      { time: "00:00", speaker: "Josh", text: "Remote collaboration has become essential in today's creative industry." },
      { time: "00:25", speaker: "Noah", text: "Clear communication protocols are even more important when working remotely." }
    ]
  },
  "7": {
    title: "Quality Control in Creative Projects",
    description: "Establish effective quality control processes to ensure consistent, high-quality creative output.",
    videoId: "MNO678",
    duration: "5:07",
    publishDate: "2024-02-26",
    tags: ["quality control", "processes", "standards"],
    transcript: [
      { time: "00:00", speaker: "Noah", text: "Quality control isn't just about final approval - it's built into every stage." },
      { time: "00:30", speaker: "Josh", text: "Having clear quality standards saves time and maintains consistency." }
    ]
  },
  "8": {
    title: "Scope Creep: Prevention and Management",
    description: "Identify, prevent, and manage scope creep to keep your creative projects on track and profitable.",
    videoId: "PQR901",
    duration: "4:41",
    publishDate: "2024-03-05",
    tags: ["scope creep", "project management", "boundaries"],
    transcript: [
      { time: "00:00", speaker: "Josh", text: "Scope creep is the silent killer of creative project profitability." },
      { time: "00:20", speaker: "Noah", text: "The key is recognizing it early and addressing it directly with clients." }
    ]
  },
  "9": {
    title: "Creative Brief Development",
    description: "Master the art of creating comprehensive creative briefs that set projects up for success from the start.",
    videoId: "STU234",
    duration: "5:24",
    publishDate: "2024-03-12",
    tags: ["creative brief", "planning", "communication"],
    transcript: [
      { time: "00:00", speaker: "Noah", text: "A good creative brief is worth its weight in gold." },
      { time: "00:25", speaker: "Josh", text: "It's the roadmap that keeps everyone aligned throughout the project." }
    ]
  },
  "10": {
    title: "Revision Rounds and Feedback Loops",
    description: "Optimize your revision process to maintain creative integrity while accommodating client feedback.",
    videoId: "VWX567",
    duration: "4:36",
    publishDate: "2024-03-19",
    tags: ["revisions", "feedback", "iteration"],
    transcript: [
      { time: "00:00", speaker: "Josh", text: "Managing revision rounds effectively is crucial for maintaining project momentum." },
      { time: "00:30", speaker: "Noah", text: "Set clear expectations about how many rounds are included in your project scope." }
    ]
  },
  "11": {
    title: "Building Long-term Client Relationships",
    description: "Strategies for nurturing client relationships that lead to repeat business and referrals.",
    videoId: "YZA890",
    duration: "5:15",
    publishDate: "2024-03-26",
    tags: ["client relationships", "business development", "networking"],
    transcript: [
      { time: "00:00", speaker: "Noah", text: "Long-term client relationships are the foundation of a sustainable creative business." },
      { time: "00:30", speaker: "Josh", text: "It's not just about delivering great work - it's about being a trusted partner." }
    ]
  },
  "12": {
    title: "Technical Specifications and Deliverables",
    description: "Ensure smooth project delivery by properly defining technical specifications and deliverable formats.",
    videoId: "BCD123",
    duration: "4:52",
    publishDate: "2024-04-02",
    tags: ["technical specs", "deliverables", "formats"],
    transcript: [
      { time: "00:00", speaker: "Josh", text: "Technical specifications might seem boring, but they prevent major headaches later." },
      { time: "00:25", speaker: "Noah", text: "Always confirm deliverable formats before you start production." }
    ]
  },
  "13": {
    title: "Creative Team Roles and Responsibilities",
    description: "Define clear roles and responsibilities to maximize efficiency and minimize conflicts in creative teams.",
    videoId: "EFG456",
    duration: "5:03",
    publishDate: "2024-04-09",
    tags: ["roles", "responsibilities", "team structure"],
    transcript: [
      { time: "00:00", speaker: "Noah", text: "Clear roles and responsibilities eliminate confusion and improve team efficiency." },
      { time: "00:30", speaker: "Josh", text: "Everyone should know exactly what they're responsible for and who to go to for decisions." }
    ]
  },
  "14": {
    title: "Post-Production Workflow Optimization",
    description: "Streamline your post-production workflows for better efficiency and consistent quality output.",
    videoId: "HIJ789",
    duration: "5:41",
    publishDate: "2024-04-16",
    tags: ["post-production", "workflow", "efficiency"],
    transcript: [
      { time: "00:00", speaker: "Josh", text: "Post-production workflow optimization can dramatically improve your turnaround times." },
      { time: "00:30", speaker: "Noah", text: "Standardizing your processes makes everything more predictable and efficient." }
    ]
  },
  "15": {
    title: "Pricing Creative Services Effectively",
    description: "Learn how to price your creative services competitively while maintaining profitability.",
    videoId: "KLM012",
    duration: "6:28",
    publishDate: "2024-04-23",
    tags: ["pricing", "business", "profitability"],
    transcript: [
      { time: "00:00", speaker: "Noah", text: "Pricing is one of the most challenging aspects of running a creative business." },
      { time: "00:30", speaker: "Josh", text: "You need to balance being competitive with maintaining healthy profit margins." }
    ]
  },
  "16": {
    title: "Crisis Management in Creative Projects",
    description: "Prepare for and manage crises that can derail creative projects, from technical failures to client issues.",
    videoId: "NOP345",
    duration: "4:29",
    publishDate: "2024-04-30",
    tags: ["crisis management", "problem solving", "contingency"],
    transcript: [
      { time: "00:00", speaker: "Josh", text: "Every creative project will face unexpected challenges - the key is being prepared." },
      { time: "00:25", speaker: "Noah", text: "Having contingency plans in place can turn a crisis into a minor setback." }
    ]
  },
  "17": {
    title: "Scaling Your Creative Business",
    description: "Strategies for growing your creative business while maintaining quality and team culture.",
    videoId: "QRS678",
    duration: "5:56",
    publishDate: "2024-05-07",
    tags: ["scaling", "business growth", "team building"],
    transcript: [
      { time: "00:00", speaker: "Noah", text: "Scaling a creative business requires different skills than running a small team." },
      { time: "00:30", speaker: "Josh", text: "You need to systematize your processes while preserving what makes your work unique." }
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
