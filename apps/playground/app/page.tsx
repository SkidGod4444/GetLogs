"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GetLogs, DiscordEmbedBuilder, SlackEmbedBuilder, TelegramMessageBuilder } from "getlogs";
import { Loader2, Send, CheckCircle, AlertCircle, Info, Save } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-localstorage";

export default function Home() {
  const [activeProvider, setActiveProvider] = useLocalStorage<"discord" | "slack" | "telegram">("getlogs-active-provider", "discord");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [exampleType, setExampleType] = useLocalStorage<"basic" | "advanced" | "custom">("getlogs-example-type", "advanced");

  // Discord Configuration
  const [discordConfig, setDiscordConfig] = useLocalStorage("getlogs-discord-config", {
    webhookUrl: "https://discord.com/api/webhooks/1391858316958760980/QiAeuVv1k8BjGCt8QkEd2MHuJy56LbtB5Bjk1lCLGo9V4tdhgv8YvDAM9f77yEHArfhv",
    title: "🚨 Application Error",
    description: "A critical error occurred in the application",
    color: "#FF0000",
    fieldName: "Error Type",
    fieldValue: "Database Connection Failed",
    fieldInline: true,
    authorName: "GetLogs Bot",
    authorIcon: "https://cdn.discordapp.com/avatars/123456789012345678/abcdefghijklmnop.png",
    authorUrl: "https://github.com/SkidGod4444/GetLogs",
    thumbnail: "https://cdn.discordapp.com/attachments/123456789012345678/987654321098765432/error.png",
    image: "https://cdn.discordapp.com/attachments/123456789012345678/987654321098765432/stack-trace.png",
    footerText: "GetLogs SDK v1.0.0",
    footerIcon: "https://cdn.discordapp.com/avatars/123456789012345678/abcdefghijklmnop.png",
    url: "https://github.com/SkidGod4444/GetLogs"
  });

  // Slack Configuration
  const [slackConfig, setSlackConfig] = useLocalStorage("getlogs-slack-config", {
    webhookUrl: "https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK",
    username: "GetLogs Bot",
    sectionText: "🚨 Application Error",
    contextText: "A critical error occurred in the application",
    imageUrl: "https://via.placeholder.com/400x200/FF0000/FFFFFF?text=Error+Visualization",
    altText: "Error visualization"
  });

  // Telegram Configuration
  const [telegramConfig, setTelegramConfig] = useLocalStorage("getlogs-telegram-config", {
    botToken: "YOUR_BOT_TOKEN",
    chatId: "YOUR_CHAT_ID",
    parseMode: "HTML" as "HTML" | "Markdown" | "MarkdownV2",
    message: "🚨 Application Error\n\nA critical error occurred in the application",
    disableWebPagePreview: false,
    disableNotification: false
  });

  const sendDiscordLog = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      const logger = new GetLogs({
        provider: "discord",
        discord: {
          webhookUrl: discordConfig.webhookUrl,
        },
      });

      let embed;
      
      if (exampleType === "basic") {
        // Basic example
        embed = new DiscordEmbedBuilder()
          .setTitle(discordConfig.title)
          .setDescription(discordConfig.description)
          .setColor(discordConfig.color);
      } else if (exampleType === "advanced") {
        // Advanced example with all features
        embed = new DiscordEmbedBuilder()
          .setTitle(discordConfig.title)
          .setDescription(discordConfig.description)
          .setColor(discordConfig.color)
          .setURL(discordConfig.url)
          .setAuthor(discordConfig.authorName, discordConfig.authorIcon, discordConfig.authorUrl)
          .setThumbnail(discordConfig.thumbnail)
          .setImage(discordConfig.image)
          .setFooter(discordConfig.footerText, discordConfig.footerIcon)
          .addField(discordConfig.fieldName, discordConfig.fieldValue, discordConfig.fieldInline)
          .addField("Severity", "Critical", true)
          .addField("Environment", "Production", true)
          .addField("Timestamp", new Date().toISOString(), false)
          .addField("Stack Trace", "```javascript\nError: Connection timeout\n    at Database.connect()\n    at App.initialize()\n```", false);
      } else {
        // Custom example - user's configuration
        embed = new DiscordEmbedBuilder()
          .setTitle(discordConfig.title)
          .setDescription(discordConfig.description)
          .setColor(discordConfig.color)
          .setURL(discordConfig.url)
          .setAuthor(discordConfig.authorName, discordConfig.authorIcon, discordConfig.authorUrl)
          .setThumbnail(discordConfig.thumbnail)
          .setImage(discordConfig.image)
          .setFooter(discordConfig.footerText, discordConfig.footerIcon)
          .addField(discordConfig.fieldName, discordConfig.fieldValue, discordConfig.fieldInline)
          .addField("Timestamp", new Date().toISOString(), false);
      }

      await logger.log({ embed: embed.toJSON() });
      setResult({ type: "success", message: "Discord message sent successfully!" });
    } catch (error) {
      setResult({ type: "error", message: `Failed to send Discord message: ${error instanceof Error ? error.message : 'Unknown error'}` });
    } finally {
      setIsLoading(false);
    }
  };

  const sendSlackLog = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      const logger = new GetLogs({
        provider: "slack",
        slack: {
          webhookUrl: slackConfig.webhookUrl,
          username: slackConfig.username,
        },
      });

      let blocks;
      
      if (exampleType === "basic") {
        // Basic example
        blocks = new SlackEmbedBuilder()
          .addSection(slackConfig.sectionText, true)
          .addSection(slackConfig.contextText, true);
      } else if (exampleType === "advanced") {
        // Advanced example with all features
        blocks = new SlackEmbedBuilder()
          .addSection(`*${slackConfig.sectionText}*`, true)
          .addSection(slackConfig.contextText, true)
          .addDivider()
          .addSection("*Error Details:*", true)
          .addContext([
            "• *Error Type:* Database Connection Failed",
            "• *Severity:* Critical",
            "• *Environment:* Production",
            `• *Timestamp:* ${new Date().toISOString()}`
          ], true)
          .addDivider()
          .addSection("*Stack Trace:*", true)
          .addSection("```\nError: Connection timeout\n    at Database.connect()\n    at App.initialize()\n```", true)
          .addDivider()
          .addImage(slackConfig.imageUrl, slackConfig.altText);
      } else {
        // Custom example - user's configuration
        blocks = new SlackEmbedBuilder()
          .addSection(slackConfig.sectionText, true)
          .addDivider()
          .addSection(slackConfig.contextText, true)
          .addDivider()
          .addContext([
            "• *Error Type:* Database Connection Failed",
            "• *Severity:* Critical",
            `• *Timestamp:* ${new Date().toISOString()}`
          ], true);
      }

      await logger.log({ blocks: blocks.toJSON().blocks });
      setResult({ type: "success", message: "Slack message sent successfully!" });
    } catch (error) {
      setResult({ type: "error", message: `Failed to send Slack message: ${error instanceof Error ? error.message : 'Unknown error'}` });
    } finally {
      setIsLoading(false);
    }
  };

  const sendTelegramLog = async () => {
    setIsLoading(true);
    setResult(null);
    
    try {
      const logger = new GetLogs({
        provider: "telegram",
        telegram: {
          botToken: telegramConfig.botToken,
          chatId: telegramConfig.chatId,
          parseMode: telegramConfig.parseMode,
          disableWebPagePreview: telegramConfig.disableWebPagePreview,
          disableNotification: telegramConfig.disableNotification,
        },
      });

      let message;
      
      if (exampleType === "basic") {
        // Basic example
        message = new TelegramMessageBuilder()
          .setParseMode(telegramConfig.parseMode)
          .setText(telegramConfig.message);
      } else if (exampleType === "advanced") {
        // Advanced example with all features
        message = new TelegramMessageBuilder()
          .setParseMode(telegramConfig.parseMode)
          .setDisableWebPagePreview(telegramConfig.disableWebPagePreview)
          .setDisableNotification(telegramConfig.disableNotification)
          .addBold("🚨 Application Error")
          .addLineBreak()
          .addLineBreak()
          .setText("A critical error occurred in the application")
          .addLineBreak()
          .addLineBreak()
          .addBold("Error Details:")
          .addLineBreak()
          .addCode("Error Type: Database Connection Failed")
          .addLineBreak()
          .addCode("Severity: Critical")
          .addLineBreak()
          .addCode("Environment: Production")
          .addLineBreak()
          .addCode(`Timestamp: ${new Date().toISOString()}`)
          .addLineBreak()
          .addLineBreak()
          .addBold("Stack Trace:")
          .addLineBreak()
          .addPreformatted("Error: Connection timeout\n    at Database.connect()\n    at App.initialize()", "javascript")
          .addLineBreak()
          .addLineBreak()
          .addLink("View Documentation", "https://github.com/SkidGod4444/GetLogs");
      } else {
        // Custom example - user's configuration
        message = new TelegramMessageBuilder()
          .setParseMode(telegramConfig.parseMode)
          .setDisableWebPagePreview(telegramConfig.disableWebPagePreview)
          .setDisableNotification(telegramConfig.disableNotification)
          .setText(telegramConfig.message);
      }

      await logger.log({ telegramMessage: message.toJSON().message });
      setResult({ type: "success", message: "Telegram message sent successfully!" });
    } catch (error) {
      setResult({ type: "error", message: `Failed to send Telegram message: ${error instanceof Error ? error.message : 'Unknown error'}` });
    } finally {
      setIsLoading(false);
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case "discord": return "bg-indigo-500";
      case "slack": return "bg-green-500";
      case "telegram": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "discord": return "💬";
      case "slack": return "🔗";
      case "telegram": return "📱";
      default: return "📤";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-100 mb-4">
            GetLogs SDK Playground
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-4">
            Test and explore the GetLogs SDK with interactive examples for Discord, Slack, and Telegram providers.
            Configure your settings and send real messages to see the SDK in action.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-slate-400 mb-6">
            <Save className="h-4 w-4" />
            <span>All settings are automatically saved to your browser</span>
          </div>
          
          {/* Example Type Selector */}
          <div className="flex justify-center gap-2 mb-6">
            <Button
              variant={exampleType === "basic" ? "default" : "outline"}
              onClick={() => setExampleType("basic")}
              className="dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600"
            >
              Basic
            </Button>
            <Button
              variant={exampleType === "advanced" ? "default" : "outline"}
              onClick={() => setExampleType("advanced")}
              className="dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600"
            >
              Advanced
            </Button>
            <Button
              variant={exampleType === "custom" ? "default" : "outline"}
              onClick={() => setExampleType("custom")}
              className="dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600"
            >
              Custom
            </Button>
          </div>
        </div>

        {/* Result Alert */}
        {result && (
          <Alert className={`mb-6 ${result.type === "success" ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950" : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950"}`}>
            {result.type === "success" ? (
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            )}
            <AlertDescription className={result.type === "success" ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"}>
              {result.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Provider Tabs */}
        <Tabs value={activeProvider} onValueChange={(value) => setActiveProvider(value as typeof activeProvider)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="discord" className="flex items-center gap-2">
              <span className="text-lg">{getProviderIcon("discord")}</span>
              Discord
            </TabsTrigger>
            <TabsTrigger value="slack" className="flex items-center gap-2">
              <span className="text-lg">{getProviderIcon("slack")}</span>
              Slack
            </TabsTrigger>
            <TabsTrigger value="telegram" className="flex items-center gap-2">
              <span className="text-lg">{getProviderIcon("telegram")}</span>
              Telegram
            </TabsTrigger>
          </TabsList>

          {/* Discord Tab */}
          <TabsContent value="discord" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">{getProviderIcon("discord")}</span>
                    Discord Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure your Discord webhook and embed settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="discord-webhook">Webhook URL</Label>
                    <Input
                      id="discord-webhook"
                      value={discordConfig.webhookUrl}
                      onChange={(e) => setDiscordConfig(prev => ({ ...prev, webhookUrl: e.target.value }))}
                      placeholder="https://discord.com/api/webhooks/..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="discord-title">Embed Title</Label>
                    <Input
                      id="discord-title"
                      value={discordConfig.title}
                      onChange={(e) => setDiscordConfig(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="🚨 Application Error"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="discord-description">Description</Label>
                    <Textarea
                      id="discord-description"
                      value={discordConfig.description}
                      onChange={(e) => setDiscordConfig(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="A critical error occurred in the application"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="discord-color">Color (Hex)</Label>
                    <Input
                      id="discord-color"
                      value={discordConfig.color}
                      onChange={(e) => setDiscordConfig(prev => ({ ...prev, color: e.target.value }))}
                      placeholder="#FF0000"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="discord-field-name">Field Name</Label>
                      <Input
                        id="discord-field-name"
                        value={discordConfig.fieldName}
                        onChange={(e) => setDiscordConfig(prev => ({ ...prev, fieldName: e.target.value }))}
                        placeholder="Error Type"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discord-field-value">Field Value</Label>
                      <Input
                        id="discord-field-value"
                        value={discordConfig.fieldValue}
                        onChange={(e) => setDiscordConfig(prev => ({ ...prev, fieldValue: e.target.value }))}
                        placeholder="Database Connection Failed"
                      />
                    </div>
                  </div>

                  {/* Advanced Discord Fields */}
                  {exampleType === "advanced" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="discord-url">Embed URL</Label>
                        <Input
                          id="discord-url"
                          value={discordConfig.url}
                          onChange={(e) => setDiscordConfig(prev => ({ ...prev, url: e.target.value }))}
                          placeholder="https://github.com/SkidGod4444/GetLogs"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="discord-author-name">Author Name</Label>
                        <Input
                          id="discord-author-name"
                          value={discordConfig.authorName}
                          onChange={(e) => setDiscordConfig(prev => ({ ...prev, authorName: e.target.value }))}
                          placeholder="GetLogs Bot"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="discord-author-icon">Author Icon URL</Label>
                          <Input
                            id="discord-author-icon"
                            value={discordConfig.authorIcon}
                            onChange={(e) => setDiscordConfig(prev => ({ ...prev, authorIcon: e.target.value }))}
                            placeholder="https://cdn.discordapp.com/avatars/..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="discord-author-url">Author URL</Label>
                          <Input
                            id="discord-author-url"
                            value={discordConfig.authorUrl}
                            onChange={(e) => setDiscordConfig(prev => ({ ...prev, authorUrl: e.target.value }))}
                            placeholder="https://github.com/SkidGod4444/GetLogs"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="discord-thumbnail">Thumbnail URL</Label>
                        <Input
                          id="discord-thumbnail"
                          value={discordConfig.thumbnail}
                          onChange={(e) => setDiscordConfig(prev => ({ ...prev, thumbnail: e.target.value }))}
                          placeholder="https://cdn.discordapp.com/attachments/..."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="discord-image">Image URL</Label>
                        <Input
                          id="discord-image"
                          value={discordConfig.image}
                          onChange={(e) => setDiscordConfig(prev => ({ ...prev, image: e.target.value }))}
                          placeholder="https://cdn.discordapp.com/attachments/..."
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="discord-footer-text">Footer Text</Label>
                          <Input
                            id="discord-footer-text"
                            value={discordConfig.footerText}
                            onChange={(e) => setDiscordConfig(prev => ({ ...prev, footerText: e.target.value }))}
                            placeholder="GetLogs SDK v1.0.0"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="discord-footer-icon">Footer Icon URL</Label>
                          <Input
                            id="discord-footer-icon"
                            value={discordConfig.footerIcon}
                            onChange={(e) => setDiscordConfig(prev => ({ ...prev, footerIcon: e.target.value }))}
                            placeholder="https://cdn.discordapp.com/avatars/..."
                          />
                        </div>
                      </div>
                    </>
                  )}
                  
                  <Button 
                    onClick={sendDiscordLog} 
                    disabled={isLoading || !discordConfig.webhookUrl}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Discord Message
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    This is how your Discord embed will look
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${getProviderColor("discord")}`}></div>
                      <span className="text-sm font-medium">Discord Embed</span>
                    </div>
                    <div className="space-y-3">
                      {exampleType === "advanced" && discordConfig.authorName && (
                        <div className="flex items-center gap-2 text-sm">
                          <img src={discordConfig.authorIcon} alt="Author" className="w-4 h-4 rounded-full" />
                          <span className="font-medium">{discordConfig.authorName}</span>
                        </div>
                      )}
                      
                      <h3 className="font-semibold text-lg">{discordConfig.title}</h3>
                      <p className="text-slate-300">{discordConfig.description}</p>
                      
                      {exampleType === "advanced" && discordConfig.thumbnail && (
                        <img src={discordConfig.thumbnail} alt="Thumbnail" className="w-16 h-16 rounded" />
                      )}
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-medium">{discordConfig.fieldName}:</span>
                          <div className="text-slate-300">{discordConfig.fieldValue}</div>
                        </div>
                        <div>
                          <span className="font-medium">Timestamp:</span>
                          <div className="text-slate-300">{new Date().toISOString()}</div>
                        </div>
                        {exampleType === "advanced" && (
                          <>
                            <div>
                              <span className="font-medium">Severity:</span>
                              <div className="text-slate-300">Critical</div>
                            </div>
                            <div>
                              <span className="font-medium">Environment:</span>
                              <div className="text-slate-300">Production</div>
                            </div>
                          </>
                        )}
                      </div>
                      
                      {exampleType === "advanced" && (
                        <div className="text-sm">
                          <span className="font-medium">Stack Trace:</span>
                          <pre className="text-slate-300 mt-1 bg-slate-800 p-2 rounded text-xs">
{`Error: Connection timeout
    at Database.connect()
    at App.initialize()`}
                          </pre>
                        </div>
                      )}
                      
                      {exampleType === "advanced" && discordConfig.image && (
                        <img src={discordConfig.image} alt="Stack trace" className="w-full rounded" />
                      )}
                      
                      {exampleType === "advanced" && discordConfig.footerText && (
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <img src={discordConfig.footerIcon} alt="Footer" className="w-3 h-3 rounded-full" />
                          <span>{discordConfig.footerText}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Slack Tab */}
          <TabsContent value="slack" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">{getProviderIcon("slack")}</span>
                    Slack Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure your Slack webhook and block settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="slack-webhook">Webhook URL</Label>
                    <Input
                      id="slack-webhook"
                      value={slackConfig.webhookUrl}
                      onChange={(e) => setSlackConfig(prev => ({ ...prev, webhookUrl: e.target.value }))}
                      placeholder="https://hooks.slack.com/services/..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="slack-username">Username</Label>
                    <Input
                      id="slack-username"
                      value={slackConfig.username}
                      onChange={(e) => setSlackConfig(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="GetLogs Bot"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="slack-section">Section Text</Label>
                    <Input
                      id="slack-section"
                      value={slackConfig.sectionText}
                      onChange={(e) => setSlackConfig(prev => ({ ...prev, sectionText: e.target.value }))}
                      placeholder="🚨 Application Error"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="slack-context">Context Text</Label>
                    <Textarea
                      id="slack-context"
                      value={slackConfig.contextText}
                      onChange={(e) => setSlackConfig(prev => ({ ...prev, contextText: e.target.value }))}
                      placeholder="A critical error occurred in the application"
                      rows={3}
                    />
                  </div>

                  {/* Advanced Slack Fields */}
                  {exampleType === "advanced" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="slack-image-url">Image URL</Label>
                        <Input
                          id="slack-image-url"
                          value={slackConfig.imageUrl}
                          onChange={(e) => setSlackConfig(prev => ({ ...prev, imageUrl: e.target.value }))}
                          placeholder="https://via.placeholder.com/400x200/FF0000/FFFFFF?text=Error+Visualization"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="slack-alt-text">Image Alt Text</Label>
                        <Input
                          id="slack-alt-text"
                          value={slackConfig.altText}
                          onChange={(e) => setSlackConfig(prev => ({ ...prev, altText: e.target.value }))}
                          placeholder="Error visualization"
                        />
                      </div>
                    </>
                  )}
                  
                  <Button 
                    onClick={sendSlackLog} 
                    disabled={isLoading || !slackConfig.webhookUrl}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Slack Message
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    This is how your Slack blocks will look
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border border-slate-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-3 h-3 rounded-full ${getProviderColor("slack")}`}></div>
                      <span className="text-sm font-medium text-slate-600">{slackConfig.username}</span>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-slate-50 p-3 rounded border-l-4 border-green-500">
                        <p className="font-medium">{slackConfig.sectionText}</p>
                      </div>
                      
                      <div className="bg-slate-50 p-3 rounded">
                        <p className="text-slate-700">{slackConfig.contextText}</p>
                      </div>
                      
                      {exampleType === "advanced" && (
                        <>
                          <div className="border-t border-slate-200"></div>
                          <div className="bg-slate-50 p-3 rounded">
                            <p className="font-medium text-slate-800">Error Details:</p>
                            <ul className="mt-2 space-y-1 text-sm text-slate-700">
                              <li>• <strong>Error Type:</strong> Database Connection Failed</li>
                              <li>• <strong>Severity:</strong> Critical</li>
                              <li>• <strong>Environment:</strong> Production</li>
                              <li>• <strong>Timestamp:</strong> {new Date().toISOString()}</li>
                            </ul>
                          </div>
                          
                          <div className="border-t border-slate-200"></div>
                          <div className="bg-slate-50 p-3 rounded">
                            <p className="font-medium text-slate-800">Stack Trace:</p>
                            <pre className="mt-2 text-xs text-slate-700 bg-slate-100 p-2 rounded">
{`Error: Connection timeout
    at Database.connect()
    at App.initialize()`}
                            </pre>
                          </div>
                          
                          {slackConfig.imageUrl && (
                            <>
                              <div className="border-t border-slate-200"></div>
                              <div className="bg-slate-50 p-3 rounded">
                                <img src={slackConfig.imageUrl} alt={slackConfig.altText} className="w-full rounded" />
                              </div>
                            </>
                          )}
                        </>
                      )}
                      
                      {exampleType !== "advanced" && (
                        <>
                          <div className="border-t border-slate-200"></div>
                          <div className="space-y-1 text-sm text-slate-600">
                            <p>• <strong>Error Type:</strong> Database Connection Failed</p>
                            <p>• <strong>Severity:</strong> Critical</p>
                            <p>• <strong>Timestamp:</strong> {new Date().toISOString()}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Telegram Tab */}
          <TabsContent value="telegram" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-lg">{getProviderIcon("telegram")}</span>
                    Telegram Configuration
                  </CardTitle>
                  <CardDescription>
                    Configure your Telegram bot and message settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="telegram-token">Bot Token</Label>
                    <Input
                      id="telegram-token"
                      value={telegramConfig.botToken}
                      onChange={(e) => setTelegramConfig(prev => ({ ...prev, botToken: e.target.value }))}
                      placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                      type="password"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="telegram-chat">Chat ID</Label>
                    <Input
                      id="telegram-chat"
                      value={telegramConfig.chatId}
                      onChange={(e) => setTelegramConfig(prev => ({ ...prev, chatId: e.target.value }))}
                      placeholder="-1001234567890"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="telegram-parse">Parse Mode</Label>
                    <Select 
                      value={telegramConfig.parseMode} 
                      onValueChange={(value) => setTelegramConfig(prev => ({ ...prev, parseMode: value as typeof telegramConfig.parseMode }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HTML">HTML</SelectItem>
                        <SelectItem value="Markdown">Markdown</SelectItem>
                        <SelectItem value="MarkdownV2">MarkdownV2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="telegram-message">Message</Label>
                    <Textarea
                      id="telegram-message"
                      value={telegramConfig.message}
                      onChange={(e) => setTelegramConfig(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="🚨 Application Error&#10;&#10;A critical error occurred in the application"
                      rows={6}
                    />
                  </div>

                  {/* Advanced Telegram Fields */}
                  {exampleType === "advanced" && (
                    <>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="telegram-disable-preview"
                          checked={telegramConfig.disableWebPagePreview}
                          onChange={(e) => setTelegramConfig(prev => ({ ...prev, disableWebPagePreview: e.target.checked }))}
                          className="rounded border-gray-300"
                          aria-label="Disable web page preview"
                        />
                        <Label htmlFor="telegram-disable-preview">Disable Web Page Preview</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="telegram-disable-notification"
                          checked={telegramConfig.disableNotification}
                          onChange={(e) => setTelegramConfig(prev => ({ ...prev, disableNotification: e.target.checked }))}
                          className="rounded border-gray-300"
                          aria-label="Disable notification"
                        />
                        <Label htmlFor="telegram-disable-notification">Disable Notification</Label>
                      </div>
                    </>
                  )}
                  
                  <Button 
                    onClick={sendTelegramLog} 
                    disabled={isLoading || !telegramConfig.botToken || !telegramConfig.chatId}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Telegram Message
                      </>
                    )}
      </Button>
                </CardContent>
              </Card>

              {/* Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    This is how your Telegram message will look
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-3 h-3 rounded-full ${getProviderColor("telegram")}`}></div>
                      <span className="text-sm font-medium text-blue-800">Telegram Message</span>
                    </div>
                    <div className="bg-white p-3 rounded border">
                      {exampleType === "advanced" ? (
                        <div className="space-y-2 text-sm">
                          <div className="font-bold text-slate-800">🚨 Application Error</div>
                          <div className="text-slate-700">A critical error occurred in the application</div>
                          <div className="font-bold text-slate-800">Error Details:</div>
                          <div className="bg-slate-100 p-2 rounded font-mono text-xs">
                            Error Type: Database Connection Failed
                          </div>
                          <div className="bg-slate-100 p-2 rounded font-mono text-xs">
                            Severity: Critical
                          </div>
                          <div className="bg-slate-100 p-2 rounded font-mono text-xs">
                            Environment: Production
                          </div>
                          <div className="bg-slate-100 p-2 rounded font-mono text-xs">
                            Timestamp: {new Date().toISOString()}
                          </div>
                          <div className="font-bold text-slate-800">Stack Trace:</div>
                          <div className="bg-slate-100 p-2 rounded font-mono text-xs">
{`Error: Connection timeout
    at Database.connect()
    at App.initialize()`}
                          </div>
                          <div className="text-blue-600 underline">
                            View Documentation
                          </div>
                        </div>
                      ) : (
                        <pre className="whitespace-pre-wrap text-sm text-slate-800 font-mono">
                          {telegramConfig.message}
                        </pre>
                      )}
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs text-blue-600">
                      <span>Parse Mode: <Badge variant="outline" className="text-xs">{telegramConfig.parseMode}</Badge></span>
                      {exampleType === "advanced" && (
                        <>
                          {telegramConfig.disableWebPagePreview && (
                            <Badge variant="outline" className="text-xs">No Preview</Badge>
                          )}
                          {telegramConfig.disableNotification && (
                            <Badge variant="outline" className="text-xs">Silent</Badge>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                Getting Started
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Replace the placeholder URLs and tokens with your actual webhook URLs and bot credentials to start sending real messages.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Type Safety
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                All providers are fully type-safe with TypeScript support and comprehensive error handling.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5 text-purple-500" />
                Builder Pattern
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Use the fluent builder APIs to create rich, structured messages for each platform.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="bg-slate-800 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-slate-100 mb-4">GetLogs SDK Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-slate-300">
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-100">🎨 Rich Formatting</h4>
                <p>Discord embeds, Slack blocks, and Telegram markdown support</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-100">🔧 Type Safety</h4>
                <p>Full TypeScript support with strict typing</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-100">⚡ Easy Integration</h4>
                <p>Simple API with builder patterns for all providers</p>
              </div>
            </div>
          </div>
          
          <div className="text-slate-400 text-sm">
            <p>Built with ❤️ using TypeScript, React, and Next.js</p>
            <p className="mt-1">
              <a 
                href="https://github.com/SkidGod4444/GetLogs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                View on GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
