import {Searchy} from '../models';

export function handleSearchy(articleData: any): Searchy[] {
  return articleData.result.map((x: any) => ({
    title: x.document.category,
    text: x.search_result.search_text,
    link: x.document.metadata.link,
  })).reverse()
}
