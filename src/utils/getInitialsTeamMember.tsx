export function getInitialsTeamMember(team: string) {
    return team
      .split(",")
      .map(member =>
        member
          .trim()
          .split(" ")
          .filter(Boolean)
          .map(word => word[0].toUpperCase())
          .join("")
      );
  }