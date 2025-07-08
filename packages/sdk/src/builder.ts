import type { DiscordEmbed } from "./types";

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
  private blocks: any[] = [];

  addSection(text: string, markdown = true) {
    this.blocks.push({
      type: "section",
      text: {
        type: markdown ? "mrkdwn" : "plain_text",
        text,
      },
    });
    return this;
  }

  addDivider() {
    this.blocks.push({ type: "divider" });
    return this;
  }

  addContext(elements: string[], markdown = true) {
    this.blocks.push({
      type: "context",
      elements: elements.map(text => ({
        type: markdown ? "mrkdwn" : "plain_text",
        text,
      })),
    });
    return this;
  }

  addImage(image_url: string, alt_text: string) {
    this.blocks.push({
      type: "image",
      image_url,
      alt_text,
    });
    return this;
  }

  toJSON() {
    return { blocks: this.blocks };
  }

  valueOf() {
    return { blocks: this.blocks };
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return { blocks: this.blocks };
  }
}



export {DiscordEmbedBuilder, SlackEmbedBuilder}