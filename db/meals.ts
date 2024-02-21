import sql from 'better-sqlite3';
import slugify from "slugify";
import xss from "xss";
import { S3 } from '@aws-sdk/client-s3';

const s3 = new S3({
  region: 'us-west-2'
});

const db = sql('meals.db');

export type MealItemProps = {
  id?: number;
  slug?: string | null;
  title: string | null;
  image: string | null | File;
  summary: string | null;
  instructions: string | null;
  creator: string | null;
  creator_email: string | null;
}

export const getMeals = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // noinspection SqlDialectInspection,SqlNoDataSourceInspection
  const foo =  db.prepare('SELECT * FROM meals').all();

  return (<MealItemProps[]> foo);
}

export const getMeal = (slug: string) => {
  // noinspection SqlDialectInspection,SqlNoDataSourceInspection
  const foo =db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
  return (<MealItemProps> foo);
}

export const saveMeal = async (mealInfo: MealItemProps) => {
  mealInfo.slug = makeUniqueSlug(mealInfo.title as string);
  mealInfo.instructions = xss(mealInfo.instructions as string);
  mealInfo.image = await processImage(mealInfo.image as File, mealInfo.slug as string);

  // noinspection SqlDialectInspection,SqlNoDataSourceInspection
  db.prepare(`
    INSERT INTO meals (title, image, summary, instructions, slug, creator, creator_email)
    VALUES (
            @title,
            @image,
            @summary,
            @instructions,
            @slug,
            @creator,
            @creator_email
           )
  `).run(mealInfo);
}

const makeUniqueSlug = (title: string) => {
  const slug = slugify(title, {lower: true});
  // try to get a meal with this slug, if it exists, need to decorate it...
  let decorator = 1;
  let testName = slug;
  while(getMeal(testName) !== undefined) {
    testName = slug + decorator;
    decorator++;
  }
  return testName;
}

const processImage = async (theImageFile: File, slug: string) => {
  const extension = theImageFile.name.split('.').pop();
  const imageName = `${slug}.${extension}`;
  const bufferedImage = await theImageFile.arrayBuffer();

  await s3.putObject({
    Bucket: process.env.AWS_IMAGE_BUCKET,
    Key: imageName,
    Body: Buffer.from(bufferedImage),
    ContentType: theImageFile.type,
  });

  return imageName;
}