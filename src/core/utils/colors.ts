import { colorPalette } from '@ses/styles/theme/colorPalette';
import { TeamScopeEnum } from '../enums/actorScopeEnum';
import { CuCategoryEnum } from '../enums/cuCategoryEnum';
import { CuJobEnum } from '../enums/cuJobEnum';
import { BudgetStatus } from '../models/interfaces/types';
import { getCorrectRoleApi } from './string';
import type { UserDTO } from '../models/dto/authDTO';

export class LimitedColorAssigner {
  private availableColors: string[];
  // map of key -> color index
  private assignedColors: Record<string, number>;
  private assignedColorsAmount: number;

  constructor(maxAssignedColor: number, handPickedColors: string[] = []) {
    this.assignedColorsAmount = 0;
    this.availableColors = this.generateColorPalette(
      handPickedColors.length,
      maxAssignedColor - handPickedColors.length,
      handPickedColors
    );
    this.assignedColors = {};
  }

  private generateColorPalette = (index: number, numColors: number, existingColors: string[] = []) => {
    const baseHue = (index * (360 / numColors)) % 360;
    const colors = [];

    for (let i = 0; i < numColors; i++) {
      let hue = (baseHue + i * (360 / numColors)) % 360;
      if (hue < 10 || hue > 350) {
        // skip red hues, make them more orange
        hue = (hue + 30) % 360;
      }
      const color = `hsl(${hue}, 70%, 50%)`;
      colors.push(color);
    }

    return [...existingColors, ...colors];
  };

  private hashIndex(key: string) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      const charCode = key.charCodeAt(i);
      hash = (hash * 31 + charCode) % this.availableColors.length;
    }
    return hash;
  }

  getColor = (key: string): string => {
    if (typeof this.assignedColors[key] === 'number') {
      return this.availableColors[this.assignedColors[key]];
    }

    if (this.assignedColorsAmount >= this.availableColors.length) {
      throw Error('No more colors available');
    }

    let index = this.hashIndex(key);
    const takenIndexes = Object.values(this.assignedColors);
    while (takenIndexes.includes(index)) {
      index = (index + 1) % this.availableColors.length;
    }

    this.assignedColors[key] = index;
    this.assignedColorsAmount += 1;
    return this.availableColors[index];
  };
}

export const getColorForString = (value: string): string => {
  let hash = 0;
  let i;

  for (i = 0; i < value?.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

export const getColorCategory = (category: CuCategoryEnum) => {
  switch (category) {
    case CuCategoryEnum.Technical:
      return {
        color: '#546978',
        background: 'rgba(246, 245, 255, 0.5)',
      };
    case CuCategoryEnum.Growth:
      return {
        color: '#DC5D00',
        background: 'rgba(255, 245, 245, 0.5);',
      };
    case CuCategoryEnum.Support:
      return {
        color: '#1AAB9B',
        background: 'rgba(245, 255, 246, 0.5)',
      };

    case CuCategoryEnum.Operational:
      return {
        color: '#9055AF',
        background: 'rgba(250, 245, 255, 0.5)',
      };
    case CuCategoryEnum.RWAs:
      return {
        color: '#2DC1B1',
        background: 'rgba(245, 255, 249, 0.5)',
      };
    case CuCategoryEnum.Finance:
      return {
        color: '#447AFB',
        background: 'rgba(247, 255, 245, 0.52)',
      };
    case CuCategoryEnum.Business:
      return {
        color: '#F08B04',
        background: 'rgba(255, 251, 245, 0.5)',
      };

    default:
      return {
        color: '#25273D',
        background: 'white',
      };
  }
};

export const getColorJobPosition = (job: CuJobEnum) => {
  switch (job) {
    case CuJobEnum.DataExpert:
      return {
        color: '#8F2EC1',
      };
    case CuJobEnum.Facilitator:
      return {
        color: '#1AAB9B',
      };
    case CuJobEnum.ProjectLead:
      return {
        color: '#635696',
      };

    case CuJobEnum.ResearchExpert:
      return {
        color: '#00B5D3',
      };
    case CuJobEnum.TeamLead:
      return {
        color: '#FF4085',
      };
    case CuJobEnum.TechExpert:
      return {
        color: '#F08B04',
      };
    case CuJobEnum.DataAnalyst:
      return {
        color: '#1DC1AE',
      };
    case CuJobEnum.Contributor:
      return {
        color: '#D44C96',
      };
    case CuJobEnum.Legal:
      return {
        color: '#FF8237',
      };
    case CuJobEnum.Product:
      return {
        color: '#02CB9B',
      };
    case CuJobEnum.Developer:
      return {
        color: '#34AAFF',
      };
    case CuJobEnum.Data:
      return {
        color: '#E4DC0A',
      };
    default:
      return {
        color: '#000000',
      };
  }
};

export const getColorRole = (user: UserDTO) => {
  const role = getCorrectRoleApi(user);
  switch (role.mainRole) {
    case 'Core Unit Admin':
      return {
        color: '#447AFB',
        darkColor: '#34AAFF',
      };
    case 'Site Admin':
      return {
        color: '#FF4085',
        darkColor: '#FF2272',
      };
    case 'User':
      return {
        color: '#1AAB9B',
        darkColor: '#00ED18',
      };

    default:
      return {
        color: '#000000',
        darkColor: '#447AFB',
      };
  }
};

// Remove this function after the reskin is done (currently have 1 reference)
export const getExpenseReportStatusColor = (
  variant: BudgetStatus
): { color: string; background: string; darkColor: string; darkBackground: string } => {
  switch (variant) {
    case BudgetStatus.Review:
      return {
        color: colorPalette.orange[800],
        darkColor: colorPalette.orange[100],
        background: colorPalette.orange[100],
        darkBackground: '#FF8A0066',
      };
    case BudgetStatus.Final:
      return {
        color: colorPalette.green[800],
        darkColor: colorPalette.green[50],
        background: colorPalette.green[100],
        darkBackground: '#34A85366',
      };
    case BudgetStatus.Escalated:
      return {
        color: colorPalette.red[800],
        darkColor: colorPalette.red[100],
        background: colorPalette.red[200],
        darkBackground: '#EA433566',
      };
    case BudgetStatus.AutoGenerated:
      return {
        color: colorPalette.gray[500],
        darkColor: colorPalette.gray[50],
        background: colorPalette.slate[50],
        darkBackground: 'rgba(72, 82, 101, 0.40)',
      };

    default: // default to draft
      return {
        color: colorPalette.blue[800],
        darkColor: colorPalette.blue[50],
        background: colorPalette.blue[100],
        darkBackground: '#0084FF66',
      };
  }
};

export const getFusionExpenseReportStatusColor = (
  variant: BudgetStatus
): { color: string; background: string; darkColor: string; darkBackground: string } => {
  switch (variant) {
    case BudgetStatus.Review:
      return {
        color: colorPalette.orange[800],
        darkColor: colorPalette.orange[100],
        background: colorPalette.orange[100],
        darkBackground: colorPalette.orange[900],
      };
    case BudgetStatus.Final:
      return {
        color: colorPalette.green[800],
        darkColor: colorPalette.green[50],
        background: colorPalette.green[100],
        darkBackground: colorPalette.green[900],
      };
    case BudgetStatus.Escalated:
      return {
        color: colorPalette.red[800],
        darkColor: colorPalette.red[100],
        background: colorPalette.red[100],
        darkBackground: colorPalette.red[900],
      };

    default: // default to draft
      return {
        color: colorPalette.blue[800],
        darkColor: colorPalette.blue[50],
        background: colorPalette.blue[100],
        darkBackground: colorPalette.blue[900],
      };
  }
};

export const getScopeColor = (
  variant: TeamScopeEnum | 'All'
): { color: string; background: string; darkColor: string; darkBackground: string } => {
  switch (variant) {
    case TeamScopeEnum.SupportScope:
      return {
        color: '#5D48FF',
        background: '#F7F5FF',
        darkColor: '#6C40AA',
        darkBackground: 'rgba(84, 38, 255, 0.20)',
      };
    case TeamScopeEnum.ProtocolScope:
      return {
        color: '#02CB9B',
        background: '#EBFFFA',
        darkColor: '#00ED18',
        darkBackground: '#17FFC833',
      };
    case TeamScopeEnum.StabilityScope:
      return {
        color: '#8F2EC1',
        background: '#FBF2FF',
        darkColor: '#8F2EC1',
        darkBackground: '#B72EFF33',
      };
    case TeamScopeEnum.GovernanceScope:
      return {
        color: '#00B5D3',
        background: '#EEFAFC',
        darkColor: '#00B5D3',
        darkBackground: '#42E8FF33',
      };
    case TeamScopeEnum.AccessibilityScope:
      return {
        color: '#635696',
        background: '#F7F4FF',
        darkColor: '#FF4085',
        darkBackground: 'rgba(255, 70, 114, 0.20)',
      };
    default:
      return {
        color: '#447AFB',
        darkColor: '#447AFB',
        background: '#EDF2FF',
        darkBackground: '#061D58',
      };
  }
};
