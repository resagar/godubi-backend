export class CreateServiceHashtagDto {
  public hashtagService: HashtagService[];
}

export class HashtagService {
  public hashtag: number;
  public service: number;
  public priority: number;
}
