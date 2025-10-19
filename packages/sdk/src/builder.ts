import type { DiscordEmbed, SlackBlock } from "./types";

class DiscordEmbedBuilder {
    private embed: DiscordEmbed = {};
  
    setTitle(title: DiscordEmbed["title"]) {
      this.embed.title = title;
      return this;
    }
  
    setDescription(description: DiscordEmbed["description"]) {
      this.embed.description = description;
      return this;
    }
  
    setColor(color: DiscordEmbed["color"] | string) {
      this.embed.color = typeof color === "string" ? parseInt(color.replace("#", ""), 16) : color;
      return this;
    }
  
    setURL(url: DiscordEmbed["url"]) {
      this.embed.url = url;
      return this;
    }
  
    setAuthor(name: string, iconURL?: string, url?: string) {
      this.embed.author = { name, iconURL, url };
      return this;
    }
  
    setThumbnail(url: string) {
      this.embed.thumbnail = url;
      return this;
    }

    setImage(url: string) {
      this.embed.image = url;
      return this;
    }

    setFooter(text: string, iconURL?: string) {
      this.embed.footer = { text, iconURL };
      return this;
    }
  
    addField(name: string, value: string, inline: boolean = false) {
      if (!this.embed.fields) this.embed.fields = [];
      this.embed.fields.push({ name, value, inline });
      return this;
    }
  
    toJSON(): DiscordEmbed {
      return this.embed;
    }

    valueOf(): DiscordEmbed {
      return this.embed;
    }

    toString(): string {
      return JSON.stringify(this.embed);
    }

    [Symbol.for("nodejs.util.inspect.custom")]() {
      return this.embed;
    }
  }


class SlackEmbedBuilder {
  private blocks: SlackBlock[] = [];

  addSection(text: string, markdown = true): this {
    this.blocks.push({
      type: "section",
      text: {
        type: markdown ? "mrkdwn" : "plain_text",
        text,
      },
    });
    return this;
  }

  addDivider(): this {
    this.blocks.push({ type: "divider" });
    return this;
  }

  addContext(elements: string[], markdown = true): this {
    this.blocks.push({
      type: "context",
      elements: elements.map(text => ({
        type: markdown ? "mrkdwn" : "plain_text",
        text,
      })),
    });
    return this;
  }

  addImage(image_url: string, alt_text: string): this {
    this.blocks.push({
      type: "image",
      image_url,
      alt_text,
    });
    return this;
  }

  toJSON(): { blocks: SlackBlock[] } {
    return { blocks: this.blocks };
  }

  valueOf(): { blocks: SlackBlock[] } {
    return { blocks: this.blocks };
  }

  [Symbol.for("nodejs.util.inspect.custom")](): { blocks: SlackBlock[] } {
    return { blocks: this.blocks };
  }
}



class TelegramMessageBuilder {
  private message: string = "";
  private parseMode: "HTML" | "Markdown" | "MarkdownV2" = "HTML";
  private disableWebPagePreview: boolean = false;
  private disableNotification: boolean = false;

  setText(text: string): this {
    this.message = text;
    return this;
  }

  setParseMode(mode: "HTML" | "Markdown" | "MarkdownV2"): this {
    this.parseMode = mode;
    return this;
  }

  setDisableWebPagePreview(disable: boolean): this {
    this.disableWebPagePreview = disable;
    return this;
  }

  setDisableNotification(disable: boolean): this {
    this.disableNotification = disable;
    return this;
  }

  addBold(text: string): this {
    if (this.parseMode === "HTML") {
      this.message += `<b>${text}</b>`;
    } else if (this.parseMode === "Markdown") {
      this.message += `*${text}*`;
    } else if (this.parseMode === "MarkdownV2") {
      this.message += `*${text}*`;
    }
    return this;
  }

  addItalic(text: string): this {
    if (this.parseMode === "HTML") {
      this.message += `<i>${text}</i>`;
    } else if (this.parseMode === "Markdown") {
      this.message += `_${text}_`;
    } else if (this.parseMode === "MarkdownV2") {
      this.message += `_${text}_`;
    }
    return this;
  }

  addCode(text: string): this {
    if (this.parseMode === "HTML") {
      this.message += `<code>${text}</code>`;
    } else if (this.parseMode === "Markdown") {
      this.message += `\`${text}\``;
    } else if (this.parseMode === "MarkdownV2") {
      this.message += `\`${text}\``;
    }
    return this;
  }

  addPreformatted(text: string, language?: string): this {
    if (this.parseMode === "HTML") {
      this.message += `<pre${language ? ` class="language-${language}"` : ""}>${text}</pre>`;
    } else if (this.parseMode === "Markdown") {
      this.message += `\`\`\`${language || ""}\n${text}\n\`\`\``;
    } else if (this.parseMode === "MarkdownV2") {
      this.message += `\`\`\`${language || ""}\n${text}\n\`\`\``;
    }
    return this;
  }

  addLink(text: string, url: string): this {
    if (this.parseMode === "HTML") {
      this.message += `<a href="${url}">${text}</a>`;
    } else if (this.parseMode === "Markdown") {
      this.message += `[${text}](${url})`;
    } else if (this.parseMode === "MarkdownV2") {
      this.message += `[${text}](${url})`;
    }
    return this;
  }

  addLineBreak(): this {
    this.message += "\n";
    return this;
  }

  toJSON(): {
    message: string;
    parseMode: "HTML" | "Markdown" | "MarkdownV2";
    disableWebPagePreview: boolean;
    disableNotification: boolean;
  } {
    return {
      message: this.message,
      parseMode: this.parseMode,
      disableWebPagePreview: this.disableWebPagePreview,
      disableNotification: this.disableNotification,
    };
  }

  valueOf(): {
    message: string;
    parseMode: "HTML" | "Markdown" | "MarkdownV2";
    disableWebPagePreview: boolean;
    disableNotification: boolean;
  } {
    return this.toJSON();
  }

  [Symbol.for("nodejs.util.inspect.custom")](): {
    message: string;
    parseMode: "HTML" | "Markdown" | "MarkdownV2";
    disableWebPagePreview: boolean;
    disableNotification: boolean;
  } {
    return this.toJSON();
  }
}

export { DiscordEmbedBuilder, SlackEmbedBuilder, TelegramMessageBuilder };