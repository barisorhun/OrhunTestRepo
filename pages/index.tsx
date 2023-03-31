
import Image from 'next/image'

import { createClient } from 'contentful';
import { TeamMember } from '../contentfulTypes';


export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_KEY || '',
  });

  const res = await client.getEntries<TeamMember>({
    content_type: 'teamMember',
  });

  return {
    props: {
      members: res.items.map((i) => i.fields),
    },
  };
}
interface TeamMemberTableProps {
  members: TeamMember[];
}
export default function Home({ members }: TeamMemberTableProps) {
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {members.map((member, index) => (
          <div key={index}>
          <div key={index}>{member.title}</div>
          <Image src={"https://" + member.picture?.fields.file.url} width={275} height={200} alt=""/>
          </div>
        ))}
      </ul>
    </div>
  )
}