export class CreateServiceHashtagDto {
  public hashtagService: HashtagService[];
}

class HashtagService {
  public hashtag: number;
  public service: number;
  public priority: number;
}
