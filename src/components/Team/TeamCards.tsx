import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TeamMember, Teams } from "./Contacts";
import _teams from "./TeamList.json";

function MemberCards() {
  const teams: Teams = _teams;
  const renderMemberCard = (member: TeamMember, j: number) => (
    <div
      key={j}
      className="flex w-[40vw] md:w-56 md:py-4 text-center flex-col md:space-y-4 space-y-4 items-center justify-center"
    >
      <img
        className="w-[35vw] md:w-48 aspect-square object-cover rounded-full"
        src={member.image}
        alt={`${member.name} image`}
      />

      <div className="card-text min-h-34">
        <div className="card-header whitespace-pre-line font-semibold text-xl">{member.name}</div>
        <div className="">
          {member.role}
          <br />
          <Popover>
            <PopoverTrigger asChild>
              <a href={"mailto:" + member.email} className="card-email">
                {member.email}
              </a>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2 bg-gray-800 text-white">
              {member.email}
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );

  return (
    <div className="team flex flex-col items-center max-w-7xl mx-auto" id="team">
      <h1 className="section-header-text">Team</h1>
      {Object.keys(teams).map((team: string, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col my-6 md:my-12 text-center text-2xl md:text-4xl font-semibold">
            {team}
          </div>
          <div className="flex flex-row flex-wrap px-6 items-center gap-4 w-full justify-center mb-8 md:items-start md:gap-x-12 md:gap-y-8 md:max-w-[70vw] mx-auto">
            {teams[team].map((member: TeamMember, j: number) => renderMemberCard(member, j))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

export default MemberCards;
