import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

// same as create movie dto except its optonal type
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
