import type { Schema, Struct } from '@strapi/strapi';

export interface SkillBlockSkillBlock extends Struct.ComponentSchema {
  collectionName: 'components_skill_block_skill_blocks';
  info: {
    displayName: 'skill-block';
  };
  attributes: {
    lottieAnimationFile: Schema.Attribute.String;
    skills: Schema.Attribute.Component<'skill-item.skill-item', true>;
    softwareSkills: Schema.Attribute.Component<
      'software-skill.software-skill',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface SkillItemSkillItem extends Struct.ComponentSchema {
  collectionName: 'components_skill_item_skill_items';
  info: {
    displayName: 'skill-item';
  };
  attributes: {
    value: Schema.Attribute.String;
  };
}

export interface SoftwareSkillSoftwareSkill extends Struct.ComponentSchema {
  collectionName: 'components_software_skill_software_skills';
  info: {
    displayName: 'software-skill';
  };
  attributes: {
    iconifyTag: Schema.Attribute.String;
    skillName: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'skill-block.skill-block': SkillBlockSkillBlock;
      'skill-item.skill-item': SkillItemSkillItem;
      'software-skill.software-skill': SoftwareSkillSoftwareSkill;
    }
  }
}
