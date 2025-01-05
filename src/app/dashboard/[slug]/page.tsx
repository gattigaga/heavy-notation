import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Name Here | Heavy Notation",
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const PageDetailPage = async ({ params }: Props) => {
  const slug = (await params).slug;

  return (
    <main className="w-full min-h-screen py-24">
      <div className="max-w-3xl mx-auto flex flex-col gap-y-4">
        {slug}
        <p>
          Hideo Kojima (小島 秀夫, Kojima Hideo, born August 24, 1963) is a
          Japanese video game designer. Regarded as one of the first auteurs of
          video games,[2] he developed a strong passion for film and literature
          during his childhood and adolescence, which in turn has had a
          significant influence on his games. In 1986, Kojima joined Konami, for
          which he directed, designed and wrote Metal Gear (1987) for the MSX2,
          the game that laid the foundations for the stealth genre and the Metal
          Gear franchise, his best known and most acclaimed work. At Konami, he
          also produced the Zone of the Enders series, as well as designing and
          writing Snatcher (1988) and Policenauts (1994), graphic adventure
          games regarded for their cinematic presentation. Kojima founded Kojima
          Productions within Konami in 2005,[1][3] and he was appointed vice
          president of Konami Digital Entertainment in 2011.[4] Following his
          departure from Konami in 2015, he refounded Kojima Productions as an
          independent studio; his first game outside Konami, Death Stranding,
          was released in 2019.[5]
        </p>
        <p>
          Kojima was born on August 24, 1963, in Setagaya, Tokyo.[6] He was the
          youngest of three children.[7] His father, Kingo, was a pharmacist who
          frequently traveled on business, and named Kojima after the most
          common name among doctors he met.[8] When he was four years old, his
          family moved to Osaka. Describing that stage of his early life, Kojima
          said it was an abrupt change of environment, and he spent much of his
          time thereafter indoors, watching television or making figurines.[9]
          While the family lived in Osaka, his parents began a tradition of the
          family watching a film together each night, and he was not allowed to
          go to bed until the film had finished. They were fond of European
          cinema, westerns, and horror, and did not limit the type of films he
          was allowed to see.[7]
        </p>
        <p>
          Kojima took an interest in filmmaking when a friend brought a Super 8
          camera to school. They began filming movies together, charging other
          children 50 yen to see them.[10] Kojima tricked his parents into
          funding a trip to an island off the coast of Japan without telling
          them he wanted to film there. Instead of filming, he spent his time
          swimming, and on the last day changed the plot to being about
          zombies.[11] He did not show the film to his parents.[12]
        </p>
        <p>
          By Kojima teenage years, the family had moved to Kawanishi, Hyōgo, in
          the Kansai region of Japan.[13] When he was 13 years old, his father
          died.[14] Kojima has discussed the impact of his father death in
          interviews, and the subsequent financial hardship faced by his
          family.[15][16][17] He enrolled at university to study economics,[18]
          and it was there that he decided to join the video game industry.[19]
          He wrote fiction while studying, even including a short story in his
          thesis.[20]
        </p>
        <p>
          While still in university, Kojima was initially searching for a way
          into film production. He hoped that, if he were to win awards for his
          written fiction, he would be approached about directing a film.[21] At
          that time, he saw Nintendo Famicom and thought of joining the video
          game industry. Kojima said that he had no friends interested in cinema
          to encourage him;[22] his friends were also not supportive when he
          announced he intended to enter game development. He would frequently
          lie about his occupation in the early days of a career, when a word
          for game designer did not exist in the Japanese language, and instead
          told people he worked for a financial firm.[23][24]
        </p>
      </div>
    </main>
  );
};

export default PageDetailPage;
