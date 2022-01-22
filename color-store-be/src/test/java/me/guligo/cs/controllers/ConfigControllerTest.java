package me.guligo.cs.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import me.guligo.cs.dtos.ConfigDto;
import me.guligo.cs.services.ConfigService;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@RunWith(SpringRunner.class)
@WebMvcTest({ConfigController.class, ConfigService.class})
@ActiveProfiles("test")
public class ConfigControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void getConfig_Should_ReturnContractAddresses() throws Exception {
        final String res = mockMvc.perform(MockMvcRequestBuilders.get("/config")
                        .contentType("application/json"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        final ConfigDto config = new ObjectMapper().readValue(res, ConfigDto.class);

        Assert.assertEquals("0x0", config.getColorCoinContractAddress());
        Assert.assertEquals("0x1", config.getColorStoreContractAddress());
    }

}
