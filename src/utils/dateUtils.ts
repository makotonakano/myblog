import moment from "moment";

export default class DateUtils {
  public static formatDate(date: string, format?: string): string {
    const dateFormat: string = format ? format : "YYYY/MM/DD";
    const baseDate: string = new Date(date).toISOString();
    return moment(baseDate).format(dateFormat);
  }

  public static sortByDate(post: node[]): node[] {
    return post.sort((a, b) => {
      const aDate = new Date(a.node.frontmatter.date);
      const bDate = new Date(b.node.frontmatter.date);

      if (aDate < bDate) return 1;
      if (aDate > bDate) return -1;
      return 0;
    });
  }
}

interface node {
  node: {
    id: string;
    frontmatter: {
      title: string;
      date: string;
      slug: string;
      tags: string[];
    };
  };
}
