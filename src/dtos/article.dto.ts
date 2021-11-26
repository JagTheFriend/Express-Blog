import { IsString } from 'class-validator';

export class ArticleDto {
  @IsString()
  public title: string;

  @IsString()
  public description: string;

  @IsString()
  public markdown: string;

  @IsString()
  public creator: string;
}
