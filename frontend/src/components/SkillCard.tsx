import { FC } from 'react';
import { Card, CardBody, CardFooter, Heading, Text, Avatar, Button, Flex, Box } from '@chakra-ui/react';

// Add to props:
export interface SkillCardProps {
  distance?: number;
  skillName: string;
  skillDescription: string;
  user: {
    name: string;
    avatar?: string;
    rating: number;
  };
  onConnect: () => void;
}

// Add to component:
export const SkillCard: FC<SkillCardProps> = ({ 
  distance,
  skillName, 
  skillDescription, 
  user, 
  onConnect 
}) => (
  <Card variant="outline" mb={4} width="100%">
    <CardBody>
      <Flex align="center" mb={4}>
        <Avatar name={user.name} src={user.avatar} mr={3} />
        <Box>
          <Heading size="md">{skillName}</Heading>
          <Text fontSize="sm" color="gray.600">
            Offered by {user.name}
            {distance !== undefined && (
              <Text fontSize="xs" color="gray.500" mt={1}>
                {`${distance.toFixed(1)}km away`}
              </Text>
            )}
          </Text>
        </Box>
      </Flex>
      <Text fontSize="sm" mb={4}>{skillDescription}</Text>
    </CardBody>

    <CardFooter borderTopWidth="1px">
      <Flex justify="space-between" width="100%">
        <Button variant="outline" size="sm">Learn More</Button>
        <Button colorScheme="blue" size="sm" onClick={onConnect}>
          Connect
        </Button>
      </Flex>
    </CardFooter>
  </Card>
);